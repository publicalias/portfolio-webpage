"use strict";

//local imports

const Control = require("./scripts/control");
const Culture = require("./scripts/culture");

const { createNewCulture, getNextGen, loadSavedCulture, validRules } = require("./scripts/app-logic");
const { childProps } = require("./scripts/view-logic");

//global imports

const { array2DEach, mouseYX } = require("canvas-games");
const { checkInput } = require("check-input");
const { bindReactClass } = require("react-utils");
const { submitKeys } = require("submit-keys");
const { cycleItems, deepCopy, storageKey } = require("utilities");

//app logic

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      culture: null,
      start: null,
      stable: null,

      history: [],
      reverse: false,

      speed: 300,
      color: 1,
      rules: "B3/S23",
      scale: 48,

      canvas: null,

      gen: null,
      pop: null,

      rulesText: "",
      scaleText: ""

    };

    bindReactClass(this);

  }

  //game logic

  resetCulture(clear, load, scale = this.state.scale) {

    const state = {
      culture: null,
      stable: false,
      history: [],
      reverse: false,
      gen: 0
    };

    const resize = scale !== this.state.scale;

    if (load) {
      loadSavedCulture(state);
    } else {
      createNewCulture(state, clear, scale, resize);
    }

    this.setState(state, this.getPopulation);

  }

  getPopulation() {

    const state = { pop: 0 };

    array2DEach(this.state.culture, (e, i, f) => {
      state.pop += f > 0 ? 1 : 0;
    });

    if (!state.pop) {
      this.stopIter();
      state.stable = true;
    }

    this.setState(state);

  }

  lastCulture() {

    const history = this.state.history.slice();
    const gen = this.state.gen - 1;

    const state = {
      culture: history.pop(),
      stable: false,
      history,
      gen
    };

    if (!gen) {
      this.stopIter();
      state.reverse = false;
    }

    this.setState(state, this.getPopulation);

  }

  nextCulture() {

    const history = this.state.history.slice();

    history.push(this.state.culture); //inefficient

    const params = {
      culture: this.state.culture,
      stable: true,
      rules: this.state.rules,
      scale: this.state.scale
    };

    getNextGen(params);

    const { culture, stable } = params;

    const state = {
      culture,
      stable,
      history,
      gen: this.state.gen + 1
    };

    if (stable) {
      this.stopIter();
    } else {
      this.setState(state, this.getPopulation);
    }

  }

  updateCulture() {
    if (this.state.reverse) {
      this.lastCulture();
    } else {
      this.nextCulture();
    }
  }

  startIter() {
    this.setState((prev) => ({ start: setInterval(this.updateCulture, prev.speed) }));
  }

  stopIter() {

    clearInterval(this.state.start);

    this.setState({ start: null });

  }

  //button events

  handleStart() {

    const reversed = this.state.reverse && this.state.history.length;
    const iterable = !this.state.stable || reversed;

    if (!this.state.start && iterable) {
      this.startIter();
    }

  }

  handleStop() {
    this.stopIter();
  }

  handleReverse() {
    if (this.state.gen) {
      this.setState((prev) => ({ reverse: !prev.reverse }));
    }
  }

  handleIterate() {

    const reversed = this.state.reverse && this.state.history.length;
    const iterable = !this.state.stable || reversed;

    if (!this.state.start && iterable) {
      this.updateCulture();
    }

  }

  handleSpeed() {

    const state = { speed: cycleItems([300, 200, 100], this.state.speed) };

    if (this.state.start) {
      this.stopIter();
      this.setState(state, this.startIter);
    } else {
      this.setState(state);
    }

  }

  handleColor() {
    this.setState((prev) => ({ color: prev.color === 1 ? 2 : 1 }));
  }

  handleClear() {
    this.resetCulture(true);
  }

  handleRandom() {
    if (!this.state.start) {
      this.resetCulture();
    }
  }

  handleRules() {

    if (this.state.start || !validRules(this.state.rulesText)) {
      return;
    }

    const state = {
      rules: this.state.rulesText,
      rulesText: ""
    };

    this.setState(state, this.resetCulture);

  }

  handleSave() {
    if (!this.state.start) {
      storageKey("culture", this.state.culture);
    }
  }

  handleLoad() {
    if (!this.state.start && storageKey("culture")) {
      this.resetCulture(null, true);
    }
  }

  handleScale() {

    const newVal = Number(this.state.scaleText);

    const noMatch = newVal !== this.state.scale;
    const inRange = newVal >= 12 && newVal <= 144;

    if (!this.state.start && noMatch && inRange) {
      this.resetCulture(false, false, newVal);
    }

  }

  //misc events

  handleInput(key) {
    return (event) => {
      this.setState({
        [key]: event.target.value
      });
    };
  }

  handleModify(event) {

    if (this.state.start) {
      return;
    }

    const culture = deepCopy(this.state.culture);
    const [y, x] = mouseYX(event, culture);

    culture[y][x] = culture[y][x] ? 0 : this.state.color;

    const state = {
      culture,
      stable: false,
      history: [],
      reverse: false,
      gen: 0
    };

    this.setState(state, this.getPopulation);

  }

  handleResize() {

    const w = Math.round($(".js-resize-culture").outerWidth());

    $(".js-resize-control, .js-resize-culture").outerHeight(w);

    this.setState({ canvas: w });

  }

  //lifecycle

  componentWillMount() {
    this.resetCulture();
  }

  componentDidMount() {

    checkInput();

    this.handleResize(); //not redundant

    $(window).on("load resize", this.handleResize);

    $(window).keydown(submitKeys("rules"));
    $(window).keydown(submitKeys("scale"));

    this.startIter();

  }

  render() {

    const { display, control } = childProps(this);

    return (
      <div className="c-content--md">
        <div className="c-row">
          <div className="c-row__col--12">
            <h2 className="u-align-center">Conway's Game of Life</h2>
            <hr />
          </div>
          <div className="c-row__col--4">
            <Control control={control} display={display} />
          </div>
          <div className="c-row__col--8">
            <Culture
              canvas={this.state.canvas}
              culture={this.state.culture}
              modify={this.handleModify}
            />
          </div>
        </div>
      </div>
    );

  }

}

//initialize app

ReactDOM.render(<App />, document.querySelector(".js-render-react"));

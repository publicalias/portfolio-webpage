"use strict";

//local imports

const EventLog = require("./scripts/event-log");
const Level = require("./scripts/level");
const Sidebar = require("./scripts/sidebar/sidebar");

const { defaultProps } = require("./scripts/default-props/default-props");
const { handleGameplay, keyDownParams } = require("./scripts/handle-key-down/handle-key-down");
const { genLevel, newGameParams, newGameState } = require("./scripts/new-game/new-game");
const { childProps } = require("./scripts/view-logic/child-props");
const { cycleHints, cycleWeapons } = require("./scripts/view-logic/event-handlers");

//global imports

const { checkInput } = require("check-input");
const { select } = require("dom-api");
const { bindReactClass } = require("react-utils");
const { deepCopy, storageKey } = require("utilities");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

//app logic

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = storageKey("save") || this.newGame();

    bindReactClass(this);

    storageKey("deaths", storageKey("deaths") || 0);
    storageKey("ngPlus", storageKey("ngPlus") || 0);

    storageKey("bestTime", storageKey("bestTime") || 0);

  }

  //start new game

  newGame() {

    const params = newGameParams();

    const { levels } = params;

    for (const p in levels) {

      params.depth = Number(p);

      genLevel(params);

    }

    return newGameState(params, this.props);

  }

  //key events

  handleKeyDown(event) {

    const params = keyDownParams(deepCopy(this.state), this.props);

    const { state, char } = params;

    if (!char.stats.hp || state.win) {
      return;
    }

    state.start = true;

    handleGameplay(params, event);

    this.setState(state);

    if (!char.stats.hp || state.win) {
      setTimeout(() => {
        this.setState(this.newGame(), this.handleResize);
      }, 3000);
    }

  }

  initKeyHandler() {

    let move = true;

    setInterval(() => {
      move = true;
    }, 100);

    return (event) => {

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
      }

      if (!move) {
        return;
      }

      move = false;

      this.handleKeyDown(event);

    };

  }

  //button events

  handleSwitch() {

    const debuff = this.state.char.debuff;

    if (this.state.win || debuff.stun || debuff.disarm) {
      return;
    }

    const char = deepCopy(this.state.char);
    const eventLog = this.state.eventLog.slice();

    const state = cycleWeapons(char, eventLog, this.props.hoverInfo, this.props.events);

    if (state) {
      this.setState(state);
    }

  }

  handleHint() {

    if (this.state.win) {
      return;
    }

    const params = {
      hints: this.props.hoverInfo.hints,
      hintLevel: this.state.hintLevel,
      nextIndex: this.state.nextIndex
    };

    this.setState(cycleHints(params));

  }

  //misc events

  handleHover(hoverText) {
    if (!this.state.win) {
      this.setState({ hoverText });
    }
  }

  handleResize() {

    const w = Math.round(select(".js-resize-level").rect().width);
    const h = Math.round(w * 0.8);

    select(".js-resize-sidebar").rect({ height: h });
    select(".js-resize-event-log").rect({ height: h * 0.15 });

    this.setState({ canvas: [w, h] });

  }

  //lifecycle

  componentDidMount() {

    checkInput();

    this.handleResize(); //not redundant

    //window events

    select(window)
      .on("load resize", this.handleResize)
      .on("keydown", this.initKeyHandler());

    //auto-save and update timer

    setInterval(() => {

      const save = () => {
        storageKey("save", this.state);
      };

      if (document.visibilityState === "visible") {
        if (this.state.start && this.state.char.stats.hp && !this.state.win) {
          this.setState((prev) => ({ time: prev.time + 1 }), save);
        } else {
          save();
        }
      }

    }, 1000);

  }

  render() {

    const { thisLevel, level, bool, hover, charInfo, hoverBox } = childProps(this);

    return (
      <div className="c-content--lg">
        <div className="c-row">
          <div className="c-row__col--12">
            <h1 className="u-align-center">Roguelike</h1>
            <hr />
          </div>
          <div className="c-row__col--8">
            <Level
              bool={bool}
              canvas={this.state.canvas}
              enemies={this.state.enemies[thisLevel]}
              hover={hover}
              level={level}
              thisLevel={thisLevel}
            />
          </div>
          <div className="c-row__col--4">
            <Sidebar charInfo={charInfo} hoverBox={hoverBox} />
          </div>
          <div className="c-row__col--12">
            <EventLog text={this.state.eventLog} />
          </div>
        </div>
      </div>
    );

  }

}

App.defaultProps = defaultProps;

//initialize app

ReactDOM.render(<App />, document.querySelector(".js-render-react"));

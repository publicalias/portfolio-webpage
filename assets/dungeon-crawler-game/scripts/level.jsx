"use strict";

//local imports

const { checkIndex, findEnemy } = require("./app-logic");
const { paintCanvas } = require("./view-logic/paint-canvas");

//global imports

const { mouseYX } = require("canvas-games");
const { select } = require("dom-api");
const { bindReactClass } = require("react-utils");
const { arrEqual } = require("utilities");

//node modules

const React = require("react");

//level

class Level extends React.Component {

  constructor(props) {

    super(props);

    bindReactClass(this);

  }

  //update display

  updateDisplay() {

    const DOMCanvas = select(".js-ref-canvas");

    const ctx = DOMCanvas.getContext("2d");
    const w = DOMCanvas.rect().width;
    const h = DOMCanvas.rect().height;

    const scale = [h / this.props.level.length, w / this.props.level[0].length];

    ctx.clearRect(0, 0, w, h);

    paintCanvas(this.props, ctx, scale);

  }

  //display info

  handleMouseMove(event) {

    const { level, bool, enemies, hover: { base, info, text, fn }, thisLevel } = this.props;

    const [y, x] = mouseYX(event, level);

    if (bool.win || checkIndex(level, [y, x]) === undefined) {
      return;
    }

    const type = [
      base,
      base,
      info.enemyInfo(findEnemy(enemies, [y, x]), bool.bsMult),
      info.potion.health,
      info.potion.damage,
      info.weapon.list[thisLevel],
      info.ability.list[thisLevel],
      info.ladder.up[thisLevel],
      info.ladder.down[thisLevel],
      base
    ];

    const newText = bool.sight[y][x] ? type[level[y][x]] : base;

    if (!arrEqual(newText, text)) {
      fn(newText);
    }

  }

  //lifecycle

  componentDidMount() {
    this.updateDisplay();
  }

  componentDidUpdate() {
    this.updateDisplay();
  }

  render() {
    return (
      <div className="js-resize-level u-margin-full">
        <canvas
          className="js-ref-canvas"
          height={this.props.canvas[1]}
          onMouseMove={this.handleMouseMove}
          width={this.props.canvas[0]}
        />
      </div>
    );
  }

}

//exports

module.exports = Level;

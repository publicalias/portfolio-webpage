"use strict";

//local imports

const { checkIndex, findEnemy } = require("../app-logic");
const { paintCanvas } = require("../view-logic");

//global imports

const { select } = require("dom-api");
const { mouseYX } = require("react-projects/app-logic");
const { arrEqual } = require("utilities");

//node modules

const React = require("react");

const { useEffect } = React;

//level

const Level = (props) => {

  //utilities

  const updateDisplay = () => {

    const DOMCanvas = select(".js-ref-canvas");

    const ctx = DOMCanvas.getContext("2d");
    const w = DOMCanvas.rect().width;
    const h = DOMCanvas.rect().height;

    const scale = [h / props.level.length, w / props.level[0].length];

    ctx.clearRect(0, 0, w, h);

    paintCanvas(props, ctx, scale);

  };

  //events

  const handleMouseMove = (event) => {

    const { level, bool, enemies, hover: { base, info, text, fn }, thisLevel } = props;

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

  };

  //lifecycle

  useEffect(updateDisplay);

  //render

  const { canvas: [width, height] } = props;

  return (
    <div className="js-resize-level u-margin-full">
      <canvas
        className="js-ref-canvas"
        height={height}
        onMouseMove={handleMouseMove}
        width={width}
      />
    </div>
  );

};

//exports

module.exports = Level;

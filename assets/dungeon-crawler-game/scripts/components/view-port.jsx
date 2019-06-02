"use strict";

//local imports

const { checkIndex, findEnemy } = require("../app-logic");
const { paintCanvas } = require("../view-logic");

//global imports

const { select } = require("dom-api");
const { mouseYX } = require("react-projects/app-logic");
const { hookEvent, useSetState } = require("react-utils");
const { arrEqual } = require("utilities");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//view port

const ViewPort = (props) => {

  //state

  const [state, setState] = useSetState({ canvas: [0, 0] });

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

  const handleResize = () => {

    const w = Math.round(select(".js-resize-level").rect().width);
    const h = Math.round(w * 0.8);

    select(".js-resize-sidebar").rect({ height: h });
    select(".js-resize-event-log").rect({ height: h * 0.15 });

    setState({ canvas: [w, h] });

  };

  //lifecycle

  useLayoutEffect(() => {

    handleResize();

    return hookEvent(select(window), "load resize", handleResize);

  }, []);

  useLayoutEffect(updateDisplay);

  //render

  const { canvas: [w, h] } = state;

  return (
    <div className="js-resize-level u-margin-full">
      <canvas
        className="js-ref-canvas"
        height={h}
        onMouseMove={handleMouseMove}
        width={w}
      />
    </div>
  );

};

//exports

module.exports = ViewPort;

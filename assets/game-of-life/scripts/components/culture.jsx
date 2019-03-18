"use strict";

//local imports

const { clearCanvas, paintCanvas } = require("../view-logic");

//global imports

const { select } = require("dom-api");
const { useSetState } = require("react-utils");

//node modules

const React = require("react");

const { useEffect, useLayoutEffect } = React;

//culture

const Culture = (props) => {

  //state

  const [state, setState] = useSetState({ canvas: 0 });

  //utilities

  const updateDisplay = () => {

    const DOMCanvas = select(".js-ref-canvas");

    const ctx = DOMCanvas.getContext("2d");
    const w = DOMCanvas.rect().width;
    const h = DOMCanvas.rect().height;

    const color = ["rgba(64, 64, 64, 0.75)", "black", "white"];

    const params = {
      ctx,
      w,
      h,
      color
    };

    clearCanvas(params);
    paintCanvas(params, props.culture);

  };

  //events

  const handleClick = (event) => {
    props.modify(event);
  };

  const handleResize = () => {

    const w = Math.round(select(".js-resize-culture").rect().width);

    select(".js-resize-control, .js-resize-culture").rect({ height: w });

    setState({ canvas: w });

  };

  //lifecycle

  useEffect(() => {
    select(".js-ref-canvas").on("mousedown", (event) => {
      if (event.detail > 1) {
        event.preventDefault(); //ignore select
      }
    });
  }, []);

  useLayoutEffect(() => {

    handleResize();

    select(window).on("resize", handleResize);

  }, []);

  useLayoutEffect(updateDisplay);

  //render

  const { canvas } = state;

  return (
    <div className="js-resize-culture">
      <canvas
        className="js-ref-canvas u-cursor-crosshair"
        height={canvas}
        onClick={handleClick}
        width={canvas}
      />
    </div>
  );

};

//exports

module.exports = Culture;

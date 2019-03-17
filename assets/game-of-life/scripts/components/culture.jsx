"use strict";

//local imports

const { clearCanvas, paintCanvas } = require("../view-logic");

//global imports

const { select } = require("dom-api");

//node modules

const React = require("react");

const { useEffect } = React;

//culture

const Culture = (props) => {

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

  //lifecycle

  useEffect(() => {
    select(".js-ref-canvas").on("mousedown", (event) => {
      if (event.detail > 1) {
        event.preventDefault(); //ignore select
      }
    });
  }, []);

  useEffect(updateDisplay);

  //render

  return (
    <div className="js-resize-culture">
      <canvas
        className="js-ref-canvas u-cursor-crosshair"
        height={props.canvas}
        onClick={handleClick}
        width={props.canvas}
      />
    </div>
  );

};

//exports

module.exports = Culture;

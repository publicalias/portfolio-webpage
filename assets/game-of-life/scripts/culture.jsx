"use strict";

//local imports

const { clearCanvas, paintCanvas } = require("./view-logic");

//global imports

const { listen } = require("dom-utils");
const { bindReactClass } = require("react-utils");

//node modules

const React = require("react");

//culture

class Culture extends React.Component {

  constructor(props) {

    super(props);

    bindReactClass(this);

  }

  //fill canvas

  updateDisplay() {

    const $canvas = $(".js-ref-canvas");
    const ctx = $canvas[0].getContext("2d");
    const w = $canvas.outerWidth();
    const h = $canvas.outerHeight();

    const color = ["rgba(64, 64, 64, 0.75)", "black", "white"];

    const params = {
      ctx,
      w,
      h,
      color
    };

    clearCanvas(params);
    paintCanvas(params, this.props.culture);

  }

  //modify cell

  handleClick(event) {
    this.props.modify(event);
  }

  //lifecycle

  componentDidMount() {

    this.updateDisplay();

    listen(".js-ref-canvas", "mousedown", (event) => {
      if (event.detail > 1) {
        event.preventDefault(); //ignore select
      }
    });

  }

  componentDidUpdate() {
    this.updateDisplay();
  }

  render() {
    return (
      <div className="js-resize-culture">
        <canvas
          className="js-ref-canvas u-cursor-crosshair"
          height={this.props.canvas}
          onClick={this.handleClick}
          width={this.props.canvas}
        />
      </div>
    );
  }

}

//exports

module.exports = Culture;

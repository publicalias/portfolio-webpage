"use strict";

//local imports

const { clearCanvas, paintCanvas } = require("./view-logic");

//global imports

const { select } = require("dom-api");
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
    paintCanvas(params, this.props.culture);

  }

  //modify cell

  handleClick(event) {
    this.props.modify(event);
  }

  //lifecycle

  componentDidMount() {

    this.updateDisplay();

    select(".js-ref-canvas").on("mousedown", (event) => {
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

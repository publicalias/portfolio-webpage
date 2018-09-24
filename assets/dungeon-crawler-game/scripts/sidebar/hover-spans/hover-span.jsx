"use strict";

//global imports

const { wrapFn } = require("utilities");

//hover span

const HoverSpan = (props) => (
  <span
    className="c-sidebar__span--hover"
    onMouseEnter={wrapFn(props.fn, props.info)}
  >
    {props.text}
  </span>
);

//exports

module.exports = HoverSpan;

"use strict";

//global imports

const { wrapFn } = require("utilities");

//node modules

const React = require("react");

//hover span

const HoverSpan = (props) => {

  const { fn, info, text } = props;

  return (
    <span
      className="c-sidebar__span--hover"
      onMouseEnter={wrapFn(fn, info)}
    >
      {text}
    </span>
  );

};

//exports

module.exports = HoverSpan;

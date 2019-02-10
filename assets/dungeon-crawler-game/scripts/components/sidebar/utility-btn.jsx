"use strict";

//node modules

const React = require("react");

//utility btn

const UtilityBtn = (props) => (
  <button
    className="c-sidebar__btn"
    onClick={props.btn.handleClick}
  >
    {props.btn.text}
  </button>
);

//exports

module.exports = UtilityBtn;

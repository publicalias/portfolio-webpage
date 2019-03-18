"use strict";

//local imports

const CharInfo = require("./char-info");
const HoverBox = require("./hover-box");

//node modules

const React = require("react");

//sidebar

const Sidebar = (props) => (
  <div className="c-sidebar js-resize-sidebar">
    <CharInfo {...props.charInfo} />
    <hr />
    <HoverBox {...props.hoverBox} />
  </div>
);

//exports

module.exports = Sidebar;

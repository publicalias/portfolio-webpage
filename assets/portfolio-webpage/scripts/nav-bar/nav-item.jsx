"use strict";

//local imports

const { scrollToItem } = require("../app-logic");

//node modules

const React = require("react");

//nav item

const NavItem = (props) => (
  <li
    className={`c-nav-bar__item--${props.mod}`}
    onClick={scrollToItem(props.link)}
  >
    {props.name}
  </li>
);

//exports

module.exports = NavItem;

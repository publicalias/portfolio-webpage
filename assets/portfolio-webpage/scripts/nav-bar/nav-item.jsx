"use strict";

//local imports

const { scrollToItem } = require("../app-logic");

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

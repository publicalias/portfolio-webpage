"use strict";

//local imports

const { scrollToItem } = require("../../event-handlers");

//node modules

const React = require("react");

//nav item

const NavItem = (props) => {

  const { link, mod, name } = props;

  return (
    <li
      className={`c-nav-bar__item--${mod} u-hover`}
      onClick={scrollToItem(link)}
    >
      {name}
    </li>
  );

};

//exports

module.exports = NavItem;

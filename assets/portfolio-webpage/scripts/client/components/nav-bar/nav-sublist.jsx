"use strict";

//local imports

const NavItem = require("./nav-item");

//global imports

const { select } = require("all/dom-api");
const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//nav sublist

const NavSublist = (props) => {

  //events

  const handleClick = () => {
    select(".js-expand-sublist").class("is-open", true);
  };

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-nav-bar__sublist">
      <li className="c-nav-bar__item--toggle u-hover" onClick={handleClick}>{props.name}</li>
      <ul className="c-nav-bar__expand js-expand-sublist">
        {props.sublist.map((e) => e.type === "item" ? (
          <NavItem
            key={keyGen(e.name)}
            link={e.link}
            mod="sublist"
            name={e.name}
          />
        ) : <hr className="c-nav-bar__rule" key={keyGen("rule")} />)}
      </ul>
    </div>
  );

};

//exports

module.exports = NavSublist;

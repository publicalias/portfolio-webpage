"use strict";

//local imports

const NavItem = require("./nav-item");
const NavSublist = require("./nav-sublist");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//nav bar

const NavBar = (props) => {

  const keyGen = initKeyGen();

  return (
    <div className="c-content--xl c-nav-bar js-ref-nav-bar">
      <div className="c-grid">
        <div className="c-grid__item--4" />
        <div className="c-grid__item--8">
          <ul className="c-nav-bar__list">
            {props.navBar.map((e) => e.type === "item" ? (
              <NavItem
                key={keyGen(e.name)}
                link={e.link}
                mod="flex"
                name={e.name}
              />
            ) : (
              <NavSublist
                key={keyGen(e.name)}
                name={e.name}
                sublist={e.sublist}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

};

//exports

module.exports = NavBar;

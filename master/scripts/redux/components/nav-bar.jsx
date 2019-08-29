"use strict";

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//nav bar

const NavBar = (props) => {

  const { local: { list } } = props;

  const { jsx: { Link } } = NavBar.injected;

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-nav-bar">
      {list.map((e) => {

        const [id, text, bool, link, util] = e;

        return bool && (
          <div className={`c-nav-bar__item ${util}`} key={keyGen(id)}>
            <Link to={link}>
              <h3 className="c-nav-bar__text u-hover">{text}</h3>
            </Link>
          </div>
        );

      })}
    </div>
  );

};

NavBar.propList = ["local"];

NavBar.injected = { jsx: { Link } };

//exports

module.exports = NavBar;
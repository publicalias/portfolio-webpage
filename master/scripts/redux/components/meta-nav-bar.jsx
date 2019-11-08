"use strict";

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//meta nav bar

const MetaNavBar = (props) => {

  const { local: { list } } = props;

  const { jsx: { Link } } = MetaNavBar.injected;

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-nav-bar js-ref-nav-bar">
      {list.map(([id, text, bool, link, util = ""]) => bool && (
        <div className={`c-nav-bar__item ${util}`} key={keyGen(id)}>
          <Link to={link}>
            <h3 className="c-nav-bar__text u-hover">{text}</h3>
          </Link>
        </div>
      ))}
    </div>
  );

};

MetaNavBar.propList = ["local"];

MetaNavBar.injected = { jsx: { Link } };

//exports

module.exports = MetaNavBar;

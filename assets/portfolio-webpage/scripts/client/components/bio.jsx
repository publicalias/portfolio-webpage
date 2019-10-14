"use strict";

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//bio

const Bio = (props) => {

  const { bio: { text, avatar } } = props;

  const keyGen = initKeyGen();

  return (
    <div className="c-content--xl js-scroll-bio">
      <div className="c-grid">
        <div className="c-grid__item--2">
          <h1>Bio</h1>
        </div>
        <div className="c-grid__item--5">
          {text.map((e) => e === "---" ? <hr key={keyGen(e)} /> : <p key={keyGen(e)}>{e}</p>)}
        </div>
        <div className="c-grid__item--5">
          <img
            alt="Ethan Frost"
            className="u-padding-left"
            src={avatar}
          />
        </div>
      </div>
    </div>
  );

};

//exports

module.exports = Bio;

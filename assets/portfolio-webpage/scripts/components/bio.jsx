"use strict";

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//bio

const Bio = (props) => {

  const keyGen = initKeyGen();

  return (
    <div className="c-content--xl js-scroll-bio">
      <div className="c-row">
        <div className="c-row__col--2">
          <h1>Bio</h1>
        </div>
        <div className="c-row__col--5">
          {props.bio.text.map((e) => <p key={keyGen(e)}>{e}</p>)}
        </div>
        <div className="c-row__col--5">
          <img
            alt="Ethan Frost"
            className="u-padding-left"
            src={props.bio.avatar}
          />
        </div>
      </div>
    </div>
  );

};

//exports

module.exports = Bio;

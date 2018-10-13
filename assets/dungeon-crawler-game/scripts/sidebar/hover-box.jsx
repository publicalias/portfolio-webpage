"use strict";

//local imports

const UtilityBtn = require("./utility-btn");

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//hover box

const HoverBox = (props) => {

  const keyGen = initKeyGen();

  return (
    <div className="c-sidebar__hover-box">
      {props.text.map((e) => <p className="c-sidebar__text" key={keyGen(e)}>{e}</p>)}
      <UtilityBtn btn={props.btn} />
    </div>
  );

};

//exports

module.exports = HoverBox;

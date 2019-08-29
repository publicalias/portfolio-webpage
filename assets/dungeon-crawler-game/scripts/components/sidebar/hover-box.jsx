"use strict";

//local imports

const UtilityBtn = require("./utility-btn");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//hover box

const HoverBox = (props) => {

  const { btn, text } = props;

  const keyGen = initKeyGen();

  return (
    <div className="c-sidebar__hover-box">
      {text.map((e) => <p className="c-sidebar__text" key={keyGen(e)}>{e}</p>)}
      <UtilityBtn btn={btn} />
    </div>
  );

};

//exports

module.exports = HoverBox;

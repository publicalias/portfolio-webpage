"use strict";

//local imports

const HoverSpan = require("./hover-span");

//global imports

const { storageKey } = require("client-utils");
const { roundTo } = require("utilities");

//node modules

const React = require("react");

//exp info

const ExpInfo = (props) => {

  const { params: { char, fn } } = props;

  const expCap = char.stats.level * 50 + 100;

  return (
    <p className="c-sidebar__text">
      <HoverSpan
        fn={fn}
        info={[`${roundTo(char.stats.exp, 1)} / ${expCap} EXP`]}
        text={`EXP: ${roundTo(char.stats.exp / expCap * 100, 1)}%`}
      />
      <span className="c-sidebar__span--right">NG+: {storageKey("ng-plus")}</span>
    </p>
  );

};

//exports

module.exports = ExpInfo;

"use strict";

//local imports

const AbilityInfo = require("./hover-spans/ability-info");
const ExpInfo = require("./hover-spans/exp-info");
const PotionInfo = require("./hover-spans/potion-info");
const WeaponInfo = require("./hover-spans/weapon-info");
const UtilityBtn = require("./utility-btn");

//global imports

const { storageKey } = require("client-utils");
const { roundTo } = require("utilities");

//node modules

const React = require("react");

//char info

const CharInfo = (props) => {

  const char = props.char;

  const classInfo = props.hover.info.classes.char[char.stats.boss ? 3 : char.stats.level - 1];
  const dmgVal = char.stats.dmg * (char.active.bsMult ? 2 : 1) * (char.active.dmgMult ? 2 : 1);

  const params = Object.assign({ char }, props.hover);

  return (
    <div className="c-sidebar__char-info">
      <p className="c-sidebar__text">
        <span className="c-sidebar__span">{classInfo} (Level {char.stats.level})</span>
        <span className="c-sidebar__span--right">Deaths: {storageKey("deaths")}</span>
      </p>
      <ExpInfo params={params} />
      <p className="c-sidebar__text">
        <span className="c-sidebar__span">HP: {roundTo(char.stats.hp, 1)}%</span>
        <span className="c-sidebar__span--right">Time: {props.time}</span>
      </p>
      <p className="c-sidebar__text">
        <span className="c-sidebar__span">RES: {char.stats.res}</span>
        <span className="c-sidebar__span--right">Best time: {storageKey("best-time") || "null"}</span>
      </p>
      <p className="c-sidebar__text">DMG: {dmgVal}</p>
      <WeaponInfo params={params} />
      <AbilityInfo params={params} />
      <PotionInfo params={params} />
      <UtilityBtn btn={props.btn} />
    </div>
  );

};

//exports

module.exports = CharInfo;

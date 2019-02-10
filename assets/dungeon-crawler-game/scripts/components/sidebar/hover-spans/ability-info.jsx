"use strict";

//local imports

const HoverSpan = require("./hover-span");

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//ability info

const AbilityInfo = (props) => {

  const keyGen = initKeyGen();

  const { char, info, fn } = props.params;

  let abilities = [];

  for (const p in char.items.abilities) {
    if (char.items.abilities[p]) {
      abilities.push({
        text: info.ability.type[p],
        info: info.ability.list[p]
      });
    }
  }

  if (!abilities.length) {
    abilities.push({
      text: info.ability.type[0],
      info: info.ability.list[0]
    });
  }

  abilities = abilities.map((e, i) => (
    <HoverSpan
      fn={fn}
      info={e.info}
      key={keyGen(e.text)}
      text={`${e.text}${i < abilities.length - 1 ? ", " : ""}`}
    />
  ));

  return <p className="c-sidebar__text">Abilities: {abilities}</p>;

};

//exports

module.exports = AbilityInfo;

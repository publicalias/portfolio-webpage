"use strict";

//local imports

const HoverSpan = require("./hover-span");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//ability info

const AbilityInfo = (props) => {

  const { params: { char, info, fn } } = props;

  const keyGen = initKeyGen();

  let abilities = Object.entries(char.items.abilities).filter(([, val]) => val);

  abilities = abilities.length ? abilities : [
    [0, true]
  ];

  abilities = abilities.map(([key]) => ({
    text: info.ability.type[key],
    info: info.ability.list[key]
  })).map((e, i) => (
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

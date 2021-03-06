"use strict";

//local imports

const HoverSpan = require("./hover-span");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//weapon info

const WeaponInfo = (props) => {

  const { params: { char, info, fn } } = props;

  const keyGen = initKeyGen();

  const held = Object.entries(char.items.weapons)
    .filter(([, val]) => val)
    .map(([key]) => info.weapon.type[key]);

  const worn = info.weapon.list[char.items.weapon];

  return (
    <p className="c-sidebar__text">
      <HoverSpan
        fn={fn}
        info={held}
        key={keyGen("held")}
        text="Weapon: "
      />
      <HoverSpan
        fn={fn}
        info={worn}
        key={keyGen("worn")}
        text={worn[0]}
      />
    </p>
  );

};

//exports

module.exports = WeaponInfo;

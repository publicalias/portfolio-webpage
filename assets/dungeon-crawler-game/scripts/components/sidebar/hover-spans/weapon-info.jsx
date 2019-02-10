"use strict";

//local imports

const HoverSpan = require("./hover-span");

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//weapon info

const WeaponInfo = (props) => {

  const keyGen = initKeyGen();

  const { char, info, fn } = props.params;

  const held = [];
  const worn = info.weapon.list[char.items.weapon];

  for (const p in char.items.weapons) {
    if (char.items.weapons[p]) {
      held.push(info.weapon.type[p]);
    }
  }

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

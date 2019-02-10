"use strict";

//local imports

const HoverSpan = require("./hover-span");

//node modules

const React = require("react");

//potion info

const PotionInfo = (props) => {

  const { char, info, fn } = props.params;

  const hpPots = (
    <HoverSpan
      fn={fn}
      info={info.potion.health}
      text={`${char.items.hpPots} (HP)`}
    />
  );

  const dmgPots = (
    <HoverSpan
      fn={fn}
      info={info.potion.damage}
      text={`${char.items.dmgPots} (DMG)`}
    />
  );

  return <p className="c-sidebar__text--last">Potions: {hpPots}, {dmgPots}</p>;

};

//exports

module.exports = PotionInfo;

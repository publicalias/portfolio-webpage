"use strict";

//global imports

const { chance } = require("utilities");

//special chance

const specialChance = (params, action) => {

  const { char } = params;
  const { target } = action;

  const roll = chance(char.active.sneak ? 30 : 15);

  if (target.stats.hp <= 33 && target.stats.type !== 3) {
    action.exec = roll;
  } else if (char.items.weapon) {
    action.eff = roll;
  }

};

//exports

module.exports = { specialChance };

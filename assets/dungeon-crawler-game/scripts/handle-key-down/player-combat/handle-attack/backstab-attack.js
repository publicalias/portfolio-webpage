"use strict";

//backstab attack

const backstabAttack = (params, action) => {

  const { char, events, updateLog } = params;
  const { target } = action;

  action.dmg *= 2;
  action.dmg *= (100 - target.stats.res / 2) / 100;
  char.active.bsMult = 0;

  updateLog(events.use.ability(3, null, null, true));

};

//exports

module.exports = { backstabAttack };

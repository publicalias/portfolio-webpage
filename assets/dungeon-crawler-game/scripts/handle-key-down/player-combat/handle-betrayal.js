"use strict";

//local imports

const { findRange } = require("../../app-logic");

//handle betrayal

const handleBetrayal = (params, action) => {

  const { char, enemies, events, updateLog } = params;
  const { target } = action;

  if (!target.active.ally) {
    return;
  }

  const range = findRange(char.stats.index).map((e) => e.toString());

  for (const e of enemies) {
    if (e.stats.hp && range.includes(e.stats.index.toString())) {
      e.active.ally = false;
      e.active.betray = true;
    }
  }

  updateLog(events.betray);

};

//exports

module.exports = { handleBetrayal };

"use strict";

//local imports

const { isCellFree } = require("../../../app-logic");

//global imports

const { chance, rngInt } = require("utilities");

//enemy morale

const enemyMorale = (params, action) => {

  const { state, char } = params;
  const { target } = action;

  const maxExp = char.stats.level === 3 && char.stats.exp + target.stats.exp >= 250;

  for (const p in state.enemies) {
    for (const e of state.enemies[p]) {
      e.active.ally = e.active.ally || e.stats.hp && !e.active.betray && (maxExp || chance(50));
    }
  }

};

//bonus content

const restockPotions = (params, depth) => {

  const { state } = params;

  const contents = [{
    type: 3,
    count: depth - 1
  }, {
    type: 4,
    count: depth - 1
  }];

  for (const e of contents) {
    while (e.count) {

      const y = rngInt(0, 64, true);
      const x = rngInt(0, 80, true);

      const freeCell = isCellFree(state.levels[depth], [y, x]);

      if (freeCell) {
        state.levels[depth][y][x] = e.type;
        e.count--;
      }

    }
  }

};

const bonusContent = (params, stage) => {

  const { state, char, events, updateLog } = params;

  if (stage === 2) {

    state.bonus = true;

    char.items.maps[3] = true;
    char.items.hpPots += 2;
    char.items.dmgPots += 2;

    restockPotions(params, 1);
    restockPotions(params, 2);

  }

  updateLog(events.bonus[stage]);

};

//exports

module.exports = {
  enemyMorale,
  bonusContent
};

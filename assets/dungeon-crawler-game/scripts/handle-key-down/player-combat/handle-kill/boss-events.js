"use strict";

//local imports

const { isCellFree } = require("../../../app-logic");

//global imports

const { chance, rngInt } = require("all/utilities");

//enemy morale

const enemyMorale = (params, action) => {

  const { merge, char } = params;
  const { target } = action;

  const maxExp = char.stats.level === 3 && char.stats.exp + target.stats.exp >= 250;

  for (const p in merge.enemies) {
    for (const e of merge.enemies[p]) {
      e.active.ally = e.active.ally || e.stats.hp && !e.active.betray && (maxExp || chance(50));
    }
  }

};

//bonus content

const restockPotions = (params, depth) => {

  const { merge } = params;

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

      const freeCell = isCellFree(merge.levels[depth], [y, x]);

      if (freeCell) {
        merge.levels[depth][y][x] = e.type;
        e.count--;
      }

    }
  }

};

const bonusContent = (params, stage) => {

  const { merge, char, events, updateLog } = params;

  if (stage === 2) {

    merge.bonus = true;

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

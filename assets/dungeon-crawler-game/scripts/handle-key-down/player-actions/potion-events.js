"use strict";

//local imports

const { findEnemy, findRange } = require("../../app-logic");

//global imports

const { chance, rngInt } = require("all/utilities");

//potion events

const throwBottle = (params) => {

  const { char, enemies, events, updateLog } = params;

  const range = findRange(char.stats.index, "short")
    .map((e) => findEnemy(enemies, e))
    .filter((e) => e && e.stats.hp && e.hostile.includes(char.stats.id) && !e.active.ally && !e.debuff.blind);

  if (!range.length) {
    return;
  }

  const enemy = range[rngInt(0, range.length)];
  const hit = chance(50);

  if (hit) {
    enemy.debuff.blind = 5;
  }

  updateLog(events.use.bottle(hit));

};

const potionEvents = (params, type, hp) => {

  const { char, events, updateLog } = params;

  const spoiled = chance(10);

  updateLog(events.use.potion(type, spoiled, hp));

  if (spoiled) {
    char.debuff.drunk = 5;
  } else {
    throwBottle(params);
  }

};

//exports

module.exports = { potionEvents };

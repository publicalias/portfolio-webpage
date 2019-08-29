"use strict";

//local imports

const { checkIndex, findEnemy, findRange, totalDist } = require("../../app-logic");

//global imports

const { chance, rngInt } = require("all/utilities");

//find target

const identifyEnemy = (params, self, nearby, index) => {

  const { enemies } = params;

  const actor = findEnemy(enemies, index);

  const redAndBlue = !self.active.ally && actor.active.ally;
  const blueAndRed = self.active.ally && !actor.active.ally;

  if (actor.stats.hp && (redAndBlue || blueAndRed)) {
    nearby.push(actor);
  }

};

const identifyPlayer = (params, self, nearby) => {

  const { char } = params;

  const isVisible = !char.active.sneak || chance(66);

  if (char.stats.hp && !self.active.ally && isVisible) {
    nearby.push(char);
  }

};

const identifyActor = (params, self, nearby, index) => {

  const { level } = params;

  const val = checkIndex(level, index);

  if (val === 2) {
    identifyEnemy(params, self, nearby, index);
  } else if (val === 9) {
    identifyPlayer(params, self, nearby);
  }

};

const findTarget = (params, self) => {

  const range = findRange(self.stats.index);
  const sortBy = [
    (e) => !self.hostile.includes(e.stats.id),
    (e) => totalDist(self.stats.index, e.stats.index),
    (e) => e.stats.hp
  ];

  let nearby = [];

  for (const e of range) {
    identifyActor(params, self, nearby, e);
  }

  for (const e of sortBy) {
    nearby = nearby.sort((a, b) => e(a) - e(b)).filter((f, i, arr) => e(f) === e(arr[0]));
  }

  return nearby[rngInt(0, nearby.length)];

};

//exports

module.exports = { findTarget };

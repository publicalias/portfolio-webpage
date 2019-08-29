"use strict";

//local imports

const { nearbyCells, playerWins } = require("../../app-logic");
const { chooseCell } = require("./choose-cell/choose-cell");
const { findTarget } = require("./find-target");
const { viablePursuit } = require("./viable-pursuit");

//global imports

const { chance } = require("all/utilities");

//enemy actions

const shouldFlee = (actors) => {

  const { self, target } = actors;

  const thug = self.stats.type === 0 && self.stats.hp <= 20 && chance(75);
  const fromBoss = target.stats.type === 3;

  return thug || fromBoss;

};

const shouldSurrender = (params, actors) => {

  const { merge } = params;
  const { self } = actors;

  const notAlly = !self.active.ally && !self.active.betray;

  return notAlly && merge.bonus;

};

const flee = (params, actors) => {

  const { events, getCounts, updateLog } = params;
  const { self } = actors;

  const moves = viablePursuit(params, actors);

  if (shouldSurrender(params, actors)) {

    self.active.ally = true;

    if (getCounts().enemy) {
      updateLog(events.surrender);
    } else {
      playerWins(params, 0, 2);
    }

  } else {
    chooseCell(params, actors, moves);
  }

};

const shouldPursue = (params, actors) => {

  const { merge } = params;
  const { self, target } = actors;

  const type = self.stats.type;
  const player = target.stats.id === "9-1-0";

  const hostile = self.hostile.includes(target.stats.id);
  const ruffian = type === 1 && chance(75);
  const brute = type === 2 && merge.hintLevel === 3;
  const boss = type === 3 && player;

  return hostile || ruffian || brute || boss;

};

const wander = (params, actors) => {

  const { level } = params;
  const { self } = actors;

  const cells = nearbyCells(self.stats.index);
  const moves = chance(33) ? cells.filter(([y, x]) => level[y][x] === 0) : [];

  chooseCell(params, actors, moves);

};

const pursue = (params, actors) => {

  const moves = viablePursuit(params, actors, true);

  if (moves.length) {
    chooseCell(params, actors, moves, true);
  } else {
    wander(params, actors);
  }

};

const enemyDecision = (params, actors) => {

  const { self, target } = actors;

  if (self.debuff.blind && chance(66)) {
    wander(params, actors);
  } else if (target) {
    if (shouldFlee(actors)) {
      flee(params, actors);
    } else if (shouldPursue(params, actors)) {
      pursue(params, actors);
    } else {
      wander(params, actors);
    }
  } else {
    wander(params, actors);
  }

};

const enemyActions = (params) => {

  const { enemies } = params;

  for (const e of enemies) {

    if (!e.stats.hp || e.debuff.stun) {
      continue;
    }

    const target = findTarget(params, e);

    const actors = {
      self: e,
      target
    };

    enemyDecision(params, actors);

  }

};

//exports

module.exports = { enemyActions };

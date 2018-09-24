"use strict";

//local imports

const { findEnemy } = require("../../../app-logic");

//global imports

const { rngInt } = require("utilities");

//change level

const moveObstacle = (params, actor) => {

  const { level } = params;

  let moved = false;

  while (!moved) {

    const y = rngInt(0, 64, true);
    const x = rngInt(0, 80, true);

    if (level[y][x] === 0) {
      actor.stats.index = [y, x];
      moved = true;
    }

  }

};

const handleCollision = (params, move) => {

  const { level, enemies } = params;
  const { from: [y, x] } = move;

  if (level[y][x] !== 2) { //objects don't spawn around ladders
    return;
  }

  moveObstacle(params, findEnemy(enemies, [y, x]));

};

const dropPotions = (params, havePots) => {

  const { char } = params;

  if (havePots) {
    char.items.hpPots = 0;
    char.items.dmgPots = 0;
    char.active.sneak = false;
  }

};

const climbLadder = (params, move, delta) => {

  const { state, char, thisLevel, level, events, updateLog } = params;
  const { from: [y, x], next } = move;

  const havePots = char.items.hpPots + char.items.dmgPots;

  handleCollision(params, move);

  state.levels[thisLevel - delta][y][x] = 0;
  level[y][x] = 9;

  char.active.bsMult = 0;
  char.active.dmgMult = 0;

  dropPotions(params, havePots);

  updateLog(events.ladder(next, thisLevel, havePots));

};

const handleLock = (params, attempt) => {

  const { state, char, thisLevel, events, updateLog } = params;
  const { unlocked, forced } = attempt;

  if (unlocked) {
    return;
  }

  state.hintLevel++;
  state.timeouts[thisLevel === 2 ? "two" : "three"] = 5;

  if (forced) {
    char.active.sneak = false;
    updateLog(events.force);
  } else {
    updateLog(events.lockpick(true, true));
  }

};

const changeLevel = (params, move, attempt) => {

  const { state } = params;
  const { next } = move;

  const delta = next === 7 ? -1 : 1;

  state.thisLevel += delta;

  params.thisLevel = state.thisLevel;
  params.enemies = state.enemies[state.thisLevel];
  params.level = state.levels[state.thisLevel];

  if (attempt) {
    handleLock(params, attempt);
  }

  climbLadder(params, move, delta);

};

//exports

module.exports = { changeLevel };

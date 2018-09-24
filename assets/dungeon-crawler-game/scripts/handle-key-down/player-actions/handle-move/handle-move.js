"use strict";

//local imports

const { findEnemy, scramble } = require("../../../app-logic");
const { changeLevel } = require("./change-level");
const { movePlayer } = require("./move-player");
const { pickUpItem } = require("./pick-up-item");

//global imports

const { chance, rngInt } = require("utilities");

//utilities

const attemptLock = (params) => {

  const { state, char, thisLevel } = params;

  const unlocked = state.hintLevel > thisLevel;
  const forced = char.stats.level > thisLevel;
  const picked = char.items.lockpicks && chance(50);

  return {
    unlocked,
    forced,
    picked,
    success: unlocked || forced || picked
  };

};

const stagger = (params) => {

  const { char } = params;

  const sober = !(char.debuff.drunk || char.active.concussed > 4);

  if (sober || chance(33)) {
    return;
  }

  const move = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ];

  return move[rngInt(0, move.length)];

};

//handle move

const floorCell = (params, move) => {

  const { char } = params;

  if (char.active.concussed && char.active.concussed < 5) {
    char.active.concussed--;
  }

  movePlayer(params, move);

};

const wallCell = (params) => {

  const { state, char, events, updateLog } = params;

  char.active.concussed++;

  switch (char.active.concussed) {
    case 3:
      updateLog(events.concussed);
      break;
    case 5:
      state.timeouts.death = 15;
      state.eventLog = state.eventLog.map(scramble);
  }

};

const enemyCell = (params, move) => {

  const { state, enemies } = params;
  const { to } = move;

  const enemy = findEnemy(enemies, to);

  if (!state.timeouts.win && enemy.stats.hp) {
    params.playerTarget = enemy;
  }

};

const hpPotCell = (params, move) => {
  pickUpItem(params, move, "potion", "health");
};

const dmgPotCell = (params, move) => {
  pickUpItem(params, move, "potion", "damage");
};

const weaponCell = (params, move) => {

  const { thisLevel } = params;

  pickUpItem(params, move, "weapon", thisLevel);

};

const abilityCell = (params, move) => {

  const { thisLevel } = params;

  pickUpItem(params, move, "ability", thisLevel);

};

const ladderCell = (params, move) => {
  changeLevel(params, move);
};

const trapdoorCell = (params, move) => {

  const { char, events, updateLog } = params;

  const attempt = attemptLock(params);

  if (attempt.success) {
    changeLevel(params, move, attempt);
  } else if (char.items.lockpicks) {
    char.items.lockpicks--;
    updateLog(events.lockpick(true));
  } else {
    updateLog(events.lockpick());
  }

};

const handleMove = (params, delta) => {

  //get next cell

  const { char, level } = params;

  const [fy, fx] = char.stats.index;
  const [dy, dx] = stagger(params) || delta;
  const [ty, tx] = [fy + dy, fx + dx];

  const next = level[ty][tx];

  const move = {
    from: [fy, fx],
    to: [ty, tx],
    next
  };

  //activate cell

  const cellTypes = [
    floorCell,
    wallCell,
    enemyCell,
    hpPotCell,
    dmgPotCell,
    weaponCell,
    abilityCell,
    ladderCell,
    trapdoorCell
  ];

  cellTypes[next](params, move);

};

//exports

module.exports = { handleMove };

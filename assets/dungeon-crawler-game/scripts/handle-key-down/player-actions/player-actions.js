"use strict";

//local imports

const { checkIndex, findRange } = require("../../app-logic");
const { handleMove } = require("./handle-move/handle-move");
const { potionEvents } = require("./potion-events");

//utilities

const areaIsClear = (params) => {

  const { char, level } = params;

  const actors = findRange(char.stats.index, "short").filter((e) => checkIndex(level, e) === 2);

  return !actors.length;

};

const attemptSneak = (params) => {

  const { char, events, updateLog } = params;

  const clear = areaIsClear(params);

  if (!char.items.abilities[2] && !clear) {
    return;
  }

  char.active.sneak = true;
  char.active.sneakCD = 3;

  updateLog(events.use.ability(1, !clear));

};

//player actions

const ArrowUpKey = (params) => {
  handleMove(params, [-1, 0]);
};

const ArrowRightKey = (params) => {
  handleMove(params, [0, 1]);
};

const ArrowDownKey = (params) => {
  handleMove(params, [1, 0]);
};

const ArrowLeftKey = (params) => {
  handleMove(params, [0, -1]);
};

const qKey = (params) => {

  const { char } = params;

  if (!char.items.hpPots || char.stats.hp === 100) {
    return;
  }

  const hp = 100 - char.stats.hp;

  char.items.hpPots--;
  char.stats.hp = 100;
  char.active.danger = false;

  potionEvents(params, "health", hp);

};

const wKey = (params) => {

  const { char } = params;

  if (!char.items.dmgPots || char.active.dmgMult) {
    return;
  }

  char.items.dmgPots--;
  char.active.dmgMult = 5;

  potionEvents(params, "damage");

};

const eKey = (params) => {

  const { char, events, updateLog } = params;

  if (char.items.abilities[1]) {
    if (char.active.sneak) {
      char.active.sneak = false;
      updateLog(events.use.ability(1, null, true));
    } else if (!char.active.sneakCD) {
      attemptSneak(params);
    }
  }

};

const rKey = (params) => {

  const { char, events, updateLog } = params;

  if (char.items.abilities[3] && char.active.sneak && char.items.weapon === 3 && !char.active.bsMult) {
    char.active.bsMult = 3;
    updateLog(events.use.ability(3));
  }

};

const playerActions = {
  ArrowUpKey,
  ArrowDownKey,
  ArrowLeftKey,
  ArrowRightKey,
  qKey,
  wKey,
  eKey,
  rKey
};

//exports

module.exports = { playerActions };

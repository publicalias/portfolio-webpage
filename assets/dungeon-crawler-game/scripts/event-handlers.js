"use strict";

//global imports

const { cycleItems } = require("utilities");

//cycle hints

const cycleHints = (params) => {

  const { hints: [head, body], hintLevel, nextIndex } = params;

  let unlocked = [];

  for (const p in body) {
    if (p <= hintLevel) {
      unlocked = unlocked.concat(body[p]);
    }
  }

  const index = nextIndex % unlocked.length;

  return {
    hoverText: [head, unlocked[index]],
    nextIndex: index + 1
  };

};

//cycle weapons

const heldWeapons = (char) => {

  const held = [];

  for (const p in char.items.weapons) {
    if (char.items.weapons[p]) {
      held.push(Number(p));
    }
  }

  return held;

};

const cycleWeapons = (char, eventLog, hoverInfo, events) => {

  const held = heldWeapons(char);

  if (held.length < 2) {
    return;
  }

  char.items.weapon = cycleItems(held, char.items.weapon);
  char.stats.dmg = char.stats.level * 5 + hoverInfo.weapon.dmg[char.items.weapon];
  char.active.bsMult = 0;

  eventLog.unshift(events.swap[char.items.weapon]);

  return {
    char,
    eventLog
  };

};

//exports

module.exports = {
  cycleHints,
  cycleWeapons
};

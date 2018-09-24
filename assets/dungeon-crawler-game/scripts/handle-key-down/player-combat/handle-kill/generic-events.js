"use strict";

//global imports

const { rngInt } = require("utilities");

//handle exp gain

const handleLevelUp = (params) => {

  const { char, events, updateLog } = params;

  while (char.stats.level < 3 && char.stats.exp >= char.stats.level * 50 + 100) {

    char.stats.exp -= char.stats.level * 50 + 100;
    char.stats.level++;
    char.stats.res += 10;
    char.stats.dmg += 5;

    updateLog(events.leveled);

  }

};

const handleExpGain = (params, action) => {

  const { char } = params;
  const { target, exec } = action;

  char.stats.exp += target.stats.exp * (exec ? 1.25 : 1);

  handleLevelUp(params);

  if (char.stats.level === 3) {
    char.stats.exp = Math.min(char.stats.exp, 250);
  }

};

//loot items

const lootItems = (params) => {

  const { state, char, thisLevel, events, updateLog } = params;

  const keys = ["maps", "lockpicks", "hpPots", "dmgPots"];
  const type = keys[rngInt(0, keys.length)];

  if (type === "maps") {
    if (!char.items.maps[thisLevel] && thisLevel < 3) {
      char.items.maps[thisLevel] = true;
      updateLog(events.loot(0));
    }
  } else if (type !== "lockpicks" || state.hintLevel < 3) {
    char.items[type]++;
    updateLog(events.loot(keys.indexOf(type)));
  }

};

//exports

module.exports = {
  handleExpGain,
  lootItems
};

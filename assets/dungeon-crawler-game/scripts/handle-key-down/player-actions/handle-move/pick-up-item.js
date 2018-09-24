"use strict";

//local imports

const { movePlayer } = require("./move-player");

//pick up item

const addItem = (params, item, type) => {

  const { char, thisLevel, hoverInfo } = params;

  switch (item) {
    case "potion":
      char.items[type === "health" ? "hpPots" : "dmgPots"]++;
      break;
    case "weapon":
      char.items.weapon = thisLevel;
      char.items.weapons[thisLevel] = true;
      char.stats.dmg = char.stats.level * 5 + hoverInfo.weapon.dmg[thisLevel];
      break;
    case "ability":
      char.items.abilities[thisLevel] = true;
  }

};

const pickUpItem = (params, move, item, type) => {

  const { char, events, hoverInfo, updateLog } = params;

  const info = hoverInfo[item];

  char.active.sneak = false;
  char.active.bsMult = 0;

  params.hoverText = info[type] || info.list[type];

  addItem(params, item, type);
  movePlayer(params, move);

  updateLog(events.pickUp[item](type));

};

//exports

module.exports = { pickUpItem };

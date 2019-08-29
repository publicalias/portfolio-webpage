"use strict";

//local imports

const { playerWins } = require("../../../app-logic");
const { enemyMorale, bonusContent } = require("./boss-events");
const { handleExpGain, lootItems } = require("./generic-events");

//global imports

const { chance } = require("all/utilities");

//handle kill

const bossEnemy = (params, action) => {

  const { getCounts } = params;

  if (getCounts().enemy) {

    enemyMorale(params, action);

    if (getCounts().enemy) {
      bonusContent(params, 1);
      handleExpGain(params, action);
      bonusContent(params, 2);
    } else {
      playerWins(params, 1);
    }

  } else {
    playerWins(params, 2);
  }

};

const normalEnemy = (params, action) => {

  const { char, events, updateLog } = params;
  const { target, exec } = action;

  //update log

  const needExp = char.stats.level < 3 || char.stats.exp < 250;
  const expGain = needExp ? target.stats.exp * (exec ? 1.25 : 1) : 0;

  updateLog(events.kill(target.stats.type, target.stats.level, expGain, exec, char.items.weapon));

  handleExpGain(params, action);

  //loot items

  if (chance(20)) {
    lootItems(params);
  }

};

const lastEnemy = (params) => {

  const { getCounts } = params;

  playerWins(params, getCounts().ally ? 0 : 2, 0);

};

const handleKill = (params, action) => {

  const { getCounts } = params;
  const { target } = action;

  if (target.stats.hp > 0) {
    return;
  }

  if (target.stats.type === 3) {
    bossEnemy(params, action);
  } else if (getCounts().enemy) {
    normalEnemy(params, action);
  } else {
    lastEnemy(params);
  }

};

//exports

module.exports = { handleKill };

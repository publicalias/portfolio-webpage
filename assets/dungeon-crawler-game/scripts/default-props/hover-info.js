"use strict";

//local imports

const { checkIndex, findEnemy, findRange, getCounts, totalDist } = require("../app-logic");
const { ability, enemyTypes, playerTypes, weapon } = require("./type-data");

//global imports

const { roundTo } = require("utilities");

//hover info

const enemyInfo = (enemy, bsMult) => {

  if (!enemy) {
    return;
  }

  const res = bsMult ? enemy.stats.res / 2 : enemy.stats.res;

  return [
    `${enemyTypes[enemy.stats.type]} (Level ${enemy.stats.level})`,
    `EXP: ${enemy.stats.exp}`,
    `HP: ${roundTo(enemy.stats.hp, 1)}%`,
    `RES: ${res}`,
    `DMG: ${enemy.stats.dmg}`
  ];

};

const enemyProx = (level, enemies, charIndex, map, bsMult) => {

  const range = findRange(charIndex, map ? "long" : "normal");

  let dist = [Infinity, Infinity];

  for (const e of range) {
    if (checkIndex(level, e) === 2) {
      if (totalDist(charIndex, e) < totalDist(charIndex, dist)) {
        dist = e;
      }
    }
  }

  return enemyInfo(findEnemy(enemies, dist), bsMult);

};

const hoverInfo = {

  //default

  base(enemies, level) {

    const counts = getCounts(enemies, level);

    return [`Level ${level}`, `Enemies: ${counts.enemy}`, `Allies: ${counts.ally}`];

  },

  //actors

  classes: {
    char: playerTypes,
    enemy: enemyTypes
  },

  enemyInfo,
  enemyProx,

  //items

  weapon,
  ability,
  potion: {
    health: ["Health Potion", "Use: \"Q\"", "Full HP"],
    damage: ["Damage Potion", "Use: \"W\"", "2x DMG", "DR: 5 ticks"]
  },

  //ladders

  ladder: {
    up: {
      2: ["Ladder", "Go to level 1."],
      3: ["Ladder", "Go to level 2."]
    },
    down: {
      1: ["Trapdoor", "Go to level 2. Level 2 required."],
      2: ["Trapdoor", "Go to level 3. Level 3 required."]
    }
  },

  //hints

  hints: ["Hint", {
    1: ["Steal weapons and learn abilities to even the odds.", "Potion bottles break easily."],
    2: ["You smuggled two lockpicks in with you.", "Intimidated enemies may surrender."],
    3: ["Backstab allows for hit-and-run tactics.", "The boss is wary from previous assassination attempts."]
  }]

};

//exports

module.exports = { hoverInfo };

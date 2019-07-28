"use strict";

//global imports

const { objEqual, chance, rngInt } = require("utilities");

//gen enemies

const enemyType = (params, enemy) => {

  const { depth, bossIndex } = params;

  const boss = bossIndex && objEqual(enemy.stats.index, bossIndex);

  const typeSets = [{
    type: [0, 1],
    level: [1, 2]
  }, {
    type: [0, 2],
    level: [1, 3]
  }, boss ? {
    type: [3, 3],
    level: [3, 3]
  } : {
    type: [1, 2],
    level: [2, 3]
  }];

  const { type: [tmin, tmax], level: [lmin, lmax] } = typeSets[depth - 1];

  enemy.stats.type = rngInt(tmin, tmax, true);
  enemy.stats.level = rngInt(lmin, lmax, true);

};

const enemyStats = (enemy) => {

  const statSets = [
    [15, 15, 10],
    [20, 10, 15],
    [25, 15, 15],
    [50, 30, 15]
  ];

  const [exp, res, dmg] = statSets[enemy.stats.type];

  enemy.stats.exp = enemy.stats.level * exp;
  enemy.stats.res = enemy.stats.level * res;
  enemy.stats.dmg = enemy.stats.level * dmg;

};

const getEnemy = (params, index, count) => {

  const { depth, bossIndex } = params;

  const boss = bossIndex && objEqual(index, bossIndex);

  const enemy = {

    stats: {
      id: `2-${depth}-${count}`,
      type: null,
      level: null,
      exp: null,
      hp: 100,
      res: null,
      dmg: null,
      index
    },

    hostile: [],

    active: {
      ally: !boss && chance(10),
      betray: false,
      clear: 3
    },

    debuff: {
      blind: 0,
      stun: 0,
      disarm: 0,
      bleed: 0
    }

  };

  enemyType(params, enemy, bossIndex);
  enemyStats(enemy);

  return enemy;

};

const genEnemies = (params) => {

  const { enemies, depth, enemyIndexes } = params;

  params.bossIndex = depth === 3 ? enemyIndexes[rngInt(0, enemies[3].length)] : null;

  enemyIndexes.forEach((e, i) => {
    enemies[depth][i] = getEnemy(params, e, i);
  });

};

//exports

module.exports = { genEnemies };

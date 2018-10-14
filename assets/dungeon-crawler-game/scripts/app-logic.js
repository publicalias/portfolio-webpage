"use strict";

//global imports

const { arrEqual, rngInt, storageKey } = require("utilities");

//add hostile

const addHostile = (self, target) => {
  if (!target.hostile.includes(self.stats.id)) {
    target.hostile.push(self.stats.id);
  }
};

//base dmg

const baseDmg = (dmg, res = 0) => {

  const rngMult = 0.75 + Math.random() * 0.5;
  const resMult = (100 - res) / 100;

  return dmg * rngMult * resMult;

};

//check index

const checkIndex = (arr, [y, x]) => arr[y] && arr[y][x];

//find enemy

const findEnemy = (enemies, index) => enemies.find((e) => arrEqual(e.stats.index, index));

//find range

const findRange = ([y, x], val = "normal") => {

  const dist = {
    short: [2, 3, 4, 4, 4],
    normal: [2, 4, 6, 6, 7, 7, 8, 8, 8],
    long: [3, 5, 7, 8, 9, 10, 10, 11, 11, 12, 12, 12, 12]
  };

  const range = [];
  const bounds = dist[val].concat(dist[val].slice(0, -1).reverse());
  const ymax = (bounds.length - 1) / 2;

  for (let i = -ymax; i < ymax + 1; i++) { //points along y axis

    const xmax = bounds[i + ymax];

    for (let j = -xmax; j < xmax + 1; j++) { //points along x axis
      range.push([y + i, x + j]);
    }

  }

  return range;

};

//get counts

const countGroup = (counts, group) => {
  for (const e of group) {
    if (e.stats.hp) {
      counts[e.active.ally ? "ally" : "enemy"]++;
    }
  }
};

const getCounts = (enemies, level) => {

  const counts = {
    ally: 0,
    enemy: 0
  };

  if (level) {
    countGroup(counts, enemies[level]);
  } else {
    for (const p in enemies) {
      countGroup(counts, enemies[p]);
    }
  }

  return counts;

};

//handle death

const handleDeath = (params) => {

  const { char, events, updateLog } = params;

  char.stats.hp = 0;

  storageKey("deaths", storageKey("deaths") + 1);
  storageKey("ngPlus", 0);

  updateLog(events.died);

};

//nearby cells

const nearbyCells = ([y, x]) => [
  [y - 1, x],
  [y, x + 1],
  [y + 1, x],
  [y, x - 1]
];

//is cell free

const isCellFree = (level, [cy, cx]) => {

  if (level[cy][cx] !== 0) {
    return false;
  }

  const avoid = [7, 8, 9];
  const cells = nearbyCells([cy, cx]);

  for (const [ny, nx] of cells) {
    if (avoid.includes(level[ny][nx])) {
      return false;
    }
  }

  return true;

};

//move actor

const moveActor = (params, actor, val, [ty, tx]) => {

  const { level } = params;

  const [fy, fx] = actor.stats.index;

  level[fy][fx] = 0;
  level[ty][tx] = val;

  actor.stats.index = [ty, tx];

};

//player wins

const playerWins = (params, type, subtype) => {

  const { state, char, events, updateLog } = params;

  char.stats.boss = true;
  state.timeouts.win = 3;

  updateLog(events.win(type, subtype));

};

//scramble

const scramble = (str) => str.split(/\b/u)
  .map((e) => {

    if (e.length < 4 || /[^a-z0-9]/iu.test(e)) {
      return e;
    }

    const from = e.split("");
    const to = [from.shift(), from.pop()];

    while (from.length) {
      to.splice(1, 0, from.splice(rngInt(0, from.length), 1));
    }

    return to.join("");

  })
  .join("");

//total dist

const totalDist = ([ay, ax], [by, bx]) => Math.abs(ay - by) + Math.abs(ax - bx);

//exports

module.exports = {
  addHostile,
  baseDmg,
  checkIndex,
  findEnemy,
  findRange,
  getCounts,
  handleDeath,
  isCellFree,
  moveActor,
  nearbyCells,
  playerWins,
  scramble,
  totalDist
};

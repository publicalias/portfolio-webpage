"use strict";

//local imports

const { isCellFree } = require("../app-logic");

//global imports

const { rngInt } = require("all/utilities");

//populate level

const trackItems = (params, type, index) => {

  const { ladders, depth, enemyIndexes } = params;

  switch (type) {
    case 2:
      enemyIndexes.push(index);
      break;
    case 8:
      ladders[depth] = index;
      break;
    case 9:
      params.charIndex = index;
  }

};

const noWall = (n) => {

  const i = rngInt(1, n / 4) * 4;

  return i % 8 ? i : noWall(n);

};

const randomCell = (params, type) => {

  const { levels, depth } = params;

  const center = type === 8 || type === 9;

  const y = center ? noWall(64) : rngInt(0, 64, true);
  const x = center ? noWall(80) : rngInt(0, 80, true);

  if (isCellFree(levels[depth], [y, x])) {
    return [y, x];
  }

};

const placeItems = (params, contents) => {
  for (const e of contents) {
    while (e.count) {

      const { levels, depth } = params;

      //choose a random cell

      const cell = randomCell(params, e.type);

      if (cell === undefined) {
        continue;
      }

      const [y, x] = cell;

      //place entities

      levels[depth][y][x] = e.type;
      e.count--;

      trackItems(params, e.type, [y, x]);

    }
  }
};

const populateLevel = (params) => {

  const { levels, ladders, depth } = params;

  const potions = 1 + 3 - depth;

  const contentsAll = [{
    type: 2,
    count: rngInt(12, 16, true)
  }, {
    type: 3,
    count: potions
  }, {
    type: 4,
    count: potions
  }, {
    type: 5,
    count: 1
  }, {
    type: 6,
    count: 1
  }];

  const contentsOne = [{
    type: 8,
    count: 1
  }, {
    type: 9,
    count: 1
  }];

  const contentsTwo = [{
    type: 8,
    count: 1
  }];

  const { 1: [y2, x2], 2: [y3, x3] } = ladders;

  params.enemyIndexes = [];

  switch (depth) {
    case 1:
      placeItems(params, contentsAll.concat(contentsOne));
      break;
    case 2:
      levels[depth][y2][x2] = 7;
      placeItems(params, contentsAll.concat(contentsTwo));
      break;
    case 3:
      levels[depth][y3][x3] = 7;
      placeItems(params, contentsAll);
  }

};

//exports

module.exports = { populateLevel };

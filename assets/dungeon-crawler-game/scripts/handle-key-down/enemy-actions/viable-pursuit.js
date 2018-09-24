"use strict";

//local imports

const { nearbyCells, totalDist } = require("../../app-logic");

//global imports

const { arrEqual } = require("utilities");

//viable pursuit

const moveIsViable = (params, actors, pursue, moves, [y, x]) => {

  const { level } = params;
  const { self, target } = actors;

  const before = totalDist(self.stats.index, target.stats.index);
  const after = totalDist([y, x], target.stats.index);
  const viableDirection = pursue ? after < before : before < after;

  const val = level[y][x];
  const viableCell = val === 0 || pursue && (val === 9 || val === 2) && arrEqual([y, x], target.stats.index);

  if (viableDirection && viableCell) {
    moves.push([y, x]);
  }

};

const viablePursuit = (params, actors, pursue) => {

  const { self } = actors;

  const cells = nearbyCells(self.stats.index);
  const moves = [];

  for (const e of cells) {
    moveIsViable(params, actors, pursue, moves, e);
  }

  return moves;

};

//exports

module.exports = { viablePursuit };

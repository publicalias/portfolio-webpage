"use strict";

//local imports

const { nearbyCells, totalDist } = require("../../app-logic");

//global imports

const { objEqual } = require("all/utilities");

//viable pursuit

const moveIsViable = (params, actors, pursue) => ([y, x]) => {

  const { level } = params;
  const { self, target } = actors;

  const before = totalDist(self.stats.index, target.stats.index);
  const after = totalDist([y, x], target.stats.index);
  const viableDirection = pursue ? after < before : before < after;

  const val = level[y][x];
  const viableCell = val === 0 || pursue && (val === 9 || val === 2) && objEqual([y, x], target.stats.index);

  return viableDirection && viableCell;

};

const viablePursuit = (params, actors, pursue) => {

  const { self } = actors;

  return nearbyCells(self.stats.index).filter(moveIsViable(params, actors, pursue));

};

//exports

module.exports = { viablePursuit };

"use strict";

//local imports

const { moveActor } = require("../../../app-logic");
const { handleCombat } = require("./handle-combat");

//global imports

const { rngInt } = require("all/utilities");

//choose cell

const chooseCell = (params, actors, moves, pursue) => {

  if (!moves.length) {
    return;
  }

  const { level } = params;
  const { self } = actors;

  const [y, x] = moves[rngInt(0, moves.length)];

  const val = level[y][x];

  switch (val) {
    case 0:
      moveActor(params, self, 2, [y, x]);
      break;
    case 2:
    case 9:
      if (pursue) {
        handleCombat(params, actors, val);
      }
  }

};

//exports

module.exports = { chooseCell };

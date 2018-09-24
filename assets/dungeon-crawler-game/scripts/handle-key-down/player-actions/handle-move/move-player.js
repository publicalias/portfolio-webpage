"use strict";

//local imports

const { checkIndex, findRange, moveActor } = require("../../../app-logic");

//move player

const movePlayer = (params, move) => {

  const { state, char, thisLevel, level } = params;
  const { from, to } = move;

  const range = char.items.maps[thisLevel] ? "long" : "normal";

  moveActor(params, char, 9, to);

  for (const [y, x] of findRange(from, range)) {
    if (checkIndex(level, [y, x]) === 1) {
      state.mapped[thisLevel][y][x] = true;
    }
  }

};

//exports

module.exports = { movePlayer };

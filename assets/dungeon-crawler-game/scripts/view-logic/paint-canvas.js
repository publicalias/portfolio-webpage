"use strict";

//local imports

const { findEnemy } = require("../app-logic");

//global imports

const { array2DEach } = require("canvas-games");

//paint canvas

const paintCanvas = (props, ctx, [y, x]) => {

  const { bool, enemies, level } = props;

  const color = [
    "lightgray",
    "dimgray",
    (enemy) => enemy.active.ally ? "darkblue" : "darkred",
    "limegreen",
    "darkorchid",
    "gray",
    "goldenrod",
    "white",
    "black",
    bool.sneak ? "lightsteelblue" : "darkblue"
  ];

  array2DEach(level, (e, i, f, j) => {

    let style = "black";

    if (bool.win || bool.sight[i][j]) {

      style = color[f];

      if (f === 2) {
        style = style(findEnemy(enemies, [i, j]));
      }

    }

    ctx.fillStyle = style;
    ctx.fillRect(x * j, y * i, x + 1, y + 1);

  });

};

//exports

module.exports = { paintCanvas };

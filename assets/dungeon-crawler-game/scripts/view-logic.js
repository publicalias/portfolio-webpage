"use strict";

//local imports

const { checkIndex, findEnemy, findRange } = require("./app-logic");

//global imports

const { array2D, array2DEach } = require("canvas-games");

//child props

const winScreen = () => {

  const letters = {
    26: [32, 36, 39, 40, 41, 44, 48],
    27: [33, 35, 38, 42, 44, 48],
    28: [34, 38, 42, 44, 48],
    29: [34, 38, 42, 44, 48],
    30: [34, 39, 40, 41, 45, 46, 47],
    33: [31, 35, 37, 38, 39, 40, 41, 43, 47, 50],
    34: [31, 35, 39, 43, 44, 47, 50],
    35: [31, 35, 39, 43, 45, 47, 50],
    36: [31, 33, 35, 39, 43, 46, 47],
    37: [32, 34, 37, 38, 39, 40, 41, 43, 47, 50]
  };

  return array2D(65, 81, (i, j) => letters[i] && letters[i].includes(j) ? 7 : 8); //"YOU WIN!"

};

const sightRange = (map, mapped, index) => {

  const sight = array2D(65, 81, (i, j) => mapped[i][j]);
  const range = map ? "long" : "normal";

  for (const [y, x] of findRange(index, range)) {
    if (checkIndex(sight, [y, x]) !== undefined) {
      sight[y][x] = true;
    }
  }

  return sight;

};

const childProps = (that) => {

  const { state, props } = that;
  const { char, thisLevel } = state;

  const level = state.win ? winScreen() : state.levels[thisLevel];

  const sight = sightRange(char.items.maps[thisLevel], state.mapped[thisLevel], char.stats.index);

  const bool = {
    win: state.win,
    sneak: char.active.sneak,
    bsMult: char.active.bsMult,
    sight
  };

  const hover = {
    text: state.hoverText,
    info: props.hoverInfo,
    fn: that.handleHover,
    base: props.hoverInfo.base(state.enemies, thisLevel)
  };

  const charInfo = {
    btn: {
      handleClick: that.handleSwitch,
      text: "Switch"
    },
    char: state.char,
    hover,
    time: state.time
  };

  const hoverBox = {
    btn: {
      handleClick: that.handleHint,
      text: "Hint"
    },
    text: state.hoverText
  };

  return {
    thisLevel,
    level,
    bool,
    hover,
    charInfo,
    hoverBox
  };

};

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

module.exports = {
  childProps,
  paintCanvas
};

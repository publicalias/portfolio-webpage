"use strict";

//global imports

const { array2D } = require("canvas-games");
const { chance, rngInt, storageKey } = require("utilities");

//create cell

const createCell = (clear) => () => clear || chance(75) ? 0 : rngInt(1, 2, true);

//create culture

const createCulture = (state, clear, scale, resize) => {

  if (resize) {
    state.scale = scale;
    state.scaleText = "";
  }

  state.culture = array2D(scale, scale, createCell(clear));

};

//get next gen

const getNeighbors = (params, y, x) => {

  const { culture, scale } = params;

  const t = y > 0 ? y - 1 : scale - 1;
  const r = x < scale - 1 ? x + 1 : 0;
  const b = y < scale - 1 ? y + 1 : 0;
  const l = x > 0 ? x - 1 : scale - 1;

  const nearby = [
    [t, x],
    [t, r],
    [y, r],
    [b, r],
    [b, x],
    [b, l],
    [y, l],
    [t, l]
  ];

  return nearby.map(([y, x]) => culture[y][x]).filter((e) => e);

};

const newbornCell = (cell) => {

  const { neighbors } = cell;

  const lastBlack = neighbors.sort().lastIndexOf(1) + 1;

  if (lastBlack > neighbors.length / 2) {
    return 1;
  } else if (lastBlack < neighbors.length / 2) {
    return 2;
  }

  return rngInt(1, 2, true);

};

const getNewVal = (params, cell, b, s) => {

  const { val, neighbors } = cell;

  const count = neighbors.length;

  let newVal = val;

  if (val === 0) {
    if (b.includes(count)) {
      params.stable = false;
      newVal = newbornCell(cell);
    }
  } else if (!s.includes(count)) {
    params.stable = false;
    newVal = 0;
  }

  return newVal;

};

const getNextGen = (params) => {

  const { culture, rules, scale } = params;

  const [b, s] = rules.split("/").map((e) => e.slice(1)
    .split("")
    .map((e) => Number(e)));

  params.culture = array2D(scale, scale, (i, j) => {

    const cell = {
      val: culture[i][j],
      neighbors: getNeighbors(params, i, j)
    };

    return getNewVal(params, cell, b, s);

  });

};

//load culture

const loadCulture = (state) => {

  const culture = storageKey("culture");

  state.culture = culture;
  state.scale = culture.length;

};

//valid rules

const validRules = (str) => {

  if (/^B[0-8]*\/S[0-8]*$/.test(str)) {

    const [a, b] = str.split("/").map((e) => e.slice(1));
    const [c, d] = [a, b].map((e) => e.split("")
      .sort()
      .filter((e, i, arr) => e !== arr[i - 1])
      .join(""));

    return a === c && b === d;

  }

  return false;

};

//exports

module.exports = {
  createCell,
  createCulture,
  getNextGen,
  loadCulture,
  validRules
};

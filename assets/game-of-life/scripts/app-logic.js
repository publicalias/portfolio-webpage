"use strict";

//global imports

const { storageKey } = require("all/client-utils");
const { bindObject, chance, initDeepCopy, rngInt } = require("all/utilities");
const { array2D, array2DEach } = require("react/app-logic");

//create cell

const createCell = (clear) => () => clear || chance(75) ? 0 : rngInt(1, 2, true);

//get population

const getPopulation = (merge) => {

  const pop = merge.culture.flat().filter((e) => e).length;

  return Object.assign(merge, { pop }, pop || {
    start: false,
    stable: true
  });

};

//get utils

const lastDiff = (last, next) => {

  const diff = []; //sparse

  array2DEach(last, (e, i, f, j) => {
    if (f !== next[i][j]) {

      if (!diff[i]) {
        diff[i] = [];
      }

      diff[i][j] = f;

    }
  });

  return diff;

};

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
    .map(Number));

  const next = array2D(scale, scale, (i, j) => {

    const cell = {
      val: culture[i][j],
      neighbors: getNeighbors(params, i, j)
    };

    return getNewVal(params, cell, b, s);

  });

  return {
    culture: next,
    stable: params.stable
  };

};

const getUtils = (state, setState) => {

  const initReset = (rules, scale) => Object.assign({
    culture: null,
    stable: false,
    history: [],
    reverse: false,
    gen: 0
  }, rules && {
    rules: state.rulesText,
    rulesText: ""
  }, scale && {
    scale: Number(state.scaleText),
    scaleText: ""
  });

  const lastCulture = () => {

    const deepCopy = initDeepCopy({ array: false });

    const history = state.history.slice();
    const culture = deepCopy(state.culture, history.pop());
    const gen = state.gen - 1;

    const merge = Object.assign({
      culture,
      stable: false,
      history,
      gen
    }, gen || {
      start: false,
      reverse: false
    });

    setState(getPopulation(merge));

  };

  const nextCulture = () => {

    const { culture, stable } = getNextGen({
      culture: state.culture,
      stable: true,
      rules: state.rules,
      scale: state.scale
    });

    if (stable) {

      setState({
        start: false,
        stable: true
      });

      return;

    }

    const history = state.history.slice();

    history.push(lastDiff(state.culture, culture));

    const merge = {
      culture,
      stable,
      history,
      gen: state.gen + 1
    };

    setState(getPopulation(merge));

  };

  const utils = {

    resetCulture(clear, load, rules, scale) {

      const merge = initReset(rules, scale);

      const length = merge.scale || state.scale;

      const culture = load ? storageKey("culture") : array2D(length, length, createCell(clear));

      Object.assign(merge, {
        culture,
        scale: culture.length
      });

      setState(getPopulation(merge));

    },

    updateCulture() {
      if (state.reverse) {
        lastCulture();
      } else {
        nextCulture();
      }
    }

  };

  bindObject(utils);

  return utils;

};

//valid rules

const validRules = (str) => {

  if (/^B[0-8]*\/S[0-8]*$/u.test(str)) {

    const [ba, sa] = str.split("/").map((e) => e.slice(1));
    const [bb, sb] = [ba, sa].map((e) => e.split("")
      .sort()
      .filter((e, i, arr) => e !== arr[i - 1])
      .join(""));

    return ba === bb && sa === sb;

  }

  return false;

};

//exports

module.exports = {
  createCell,
  getPopulation,
  getUtils,
  validRules
};

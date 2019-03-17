"use strict";

//local imports

const { getPopulation, validRules } = require("./app-logic");

//global imports

const { storageKey } = require("client-utils");
const { select } = require("dom-api");
const { mouseYX } = require("react-projects/app-logic");
const { cycleItems, deepCopy } = require("utilities");

//get handlers

const getHandlers = (state, setState, utils) => ({

  //button

  start() {

    const reversed = state.reverse && state.history.length;
    const iterable = !state.stable || reversed;

    if (iterable) {
      setState({ start: true });
    }

  },

  stop() {
    setState({ start: false });
  },

  reverse() {
    if (state.gen) {
      setState((prev) => ({ reverse: !prev.reverse }));
    }
  },

  iterate() {

    const reversed = state.reverse && state.history.length;
    const iterable = !state.stable || reversed;

    if (!state.start && iterable) {
      utils.updateCulture();
    }

  },

  speed() {
    setState((prev) => ({ speed: cycleItems([300, 200, 100], prev.speed) }));
  },

  color() {
    setState((prev) => ({ color: prev.color === 1 ? 2 : 1 }));
  },

  clear() {
    if (!state.start) {
      utils.resetCulture(true);
    }
  },

  random() {
    if (!state.start) {
      utils.resetCulture();
    }
  },

  rules() {

    if (state.start || !validRules(state.rulesText)) {
      return;
    }

    const merge = {
      rules: state.rulesText,
      rulesText: ""
    };

    setState(merge, utils.resetCulture);

  },

  save() {
    if (!state.start) {
      storageKey("culture", state.culture);
    }
  },

  load() {
    if (!state.start && storageKey("culture")) {
      utils.resetCulture(null, true);
    }
  },

  scale() {

    const newVal = Number(state.scaleText);

    const noMatch = newVal !== state.scale;
    const inRange = newVal >= 12 && newVal <= 144;

    if (!state.start && noMatch && inRange) {
      utils.resetCulture(false, false, newVal);
    }

  },

  //input

  input(key) {
    return (event) => {
      setState({
        [key]: event.target.value
      });
    };
  },

  //canvas

  modify(event) {

    if (state.start) {
      return;
    }

    const culture = deepCopy(state.culture);
    const [y, x] = mouseYX(event, culture);

    culture[y][x] = culture[y][x] ? 0 : state.color;

    const merge = {
      culture,
      stable: false,
      history: [],
      reverse: false,
      gen: 0
    };

    setState(Object.assign(merge, getPopulation(culture)));

  },

  resize() {

    const w = Math.round(select(".js-resize-culture").rect().width);

    select(".js-resize-control, .js-resize-culture").rect({ height: w });

    setState({ canvas: w });

  }

});

//exports

module.exports = { getHandlers };

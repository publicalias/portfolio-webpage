"use strict";

//local imports

const { getPopulation, validRules } = require("./app-logic");

//global imports

const { storageKey } = require("client-utils");
const { mouseYX } = require("react-projects/app-logic");
const { cycleItems, deepCopy } = require("utilities");

//node modules

const { useLayoutEffect } = require("react");

//get handlers

const getHandlers = (state, setState, utils) => ({

  //button

  start() {

    const { stable, history, reverse } = state;

    const reversed = reverse && history.length;
    const iterable = !stable || reversed;

    if (iterable) {
      setState({ start: true });
    }

  },

  stop() {
    setState({ start: false });
  },

  reverse() {
    if (state.gen) {
      setState({ reverse: !state.reverse });
    }
  },

  iterate() {

    const { start, stable, history, reverse } = state;

    const reversed = reverse && history.length;
    const iterable = !stable || reversed;

    if (!start && iterable) {
      utils.updateCulture();
    }

  },

  speed() {
    setState({ speed: cycleItems([300, 200, 100], state.speed) });
  },

  color() {
    setState({ color: state.color === 1 ? 2 : 1 });
  },

  clear() {
    utils.resetCulture(true);
  },

  random() {
    if (!state.start) {
      utils.resetCulture();
    }
  },

  rules() {

    const { start, scale, rulesText } = state;

    if (!start && validRules(rulesText)) {
      utils.resetCulture(false, false, true, scale);
    }

  },

  save() {
    if (!state.start) {
      storageKey("culture", state.culture);
    }
  },

  load() {
    if (!state.start && storageKey("culture")) {
      utils.resetCulture(false, true);
    }
  },

  scale() {

    const { start, scale, scaleText } = state;

    const newVal = Number(scaleText);

    const noMatch = newVal !== scale;
    const inRange = newVal >= 12 && newVal <= 144;

    if (!start && noMatch && inRange) {
      utils.resetCulture(false, false, false, true);
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

    setState(getPopulation(merge));

  }

});

//use fast interval

const useFastInterval = (fn, speed) => {
  useLayoutEffect(() => {

    if (typeof speed !== "number") {
      return;
    }

    const id = setTimeout(fn, speed); //less racy

    return () => {
      clearTimeout(id);
    };

  });
};

//exports

module.exports = {
  getHandlers,
  useFastInterval
};

"use strict";

//local imports

const { handleDeath } = require("../app-logic");

//global imports

const { storageKey } = require("utilities");

//timeout handler

const levelEvent = (params, num) => {

  const { events, updateLog } = params;

  updateLog(events.level[num]);

};

const oneTimeout = (params) => {
  levelEvent(params, 1);
};

const twoTimeout = (params) => {
  levelEvent(params, 2);
};

const threeTimeout = (params) => {
  levelEvent(params, 3);
};

const winTimeout = (params) => {

  const { state } = params;

  const time = state.time;
  const bestTime = storageKey("best-time");

  state.win = true;

  storageKey("deaths", 0);
  storageKey("ng-plus", storageKey("ng-plus") + 1);

  storageKey("best-time", bestTime ? Math.min(time, bestTime) : time);

};

const deathTimeout = (params) => {
  handleDeath(params);
};

const timeoutHandler = (params) => {

  const { state } = params;

  const timeouts = {
    oneTimeout,
    twoTimeout,
    threeTimeout,
    winTimeout,
    deathTimeout
  };

  for (const p in state.timeouts) {

    if (!state.timeouts[p]) {
      continue;
    }

    state.timeouts[p]--;

    if (!state.timeouts[p]) {
      timeouts[`${p}Timeout`](params);
    }

  }

};

//exports

module.exports = { timeoutHandler };

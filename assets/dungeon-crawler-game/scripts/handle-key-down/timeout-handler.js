"use strict";

//local imports

const { handleDeath } = require("../app-logic");

//global imports

const { storageKey } = require("client-utils");

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

  const { merge } = params;

  const time = storageKey("time");

  merge.win = true;

  storageKey("deaths", 0);
  storageKey("ng-plus", (val) => val + 1);

  storageKey("best-time", (val) => Math.min(time, val || Infinity));

};

const deathTimeout = (params) => {
  handleDeath(params);
};

const timeoutHandler = (params) => {

  const { merge: { timeouts } } = params;

  const handlers = {
    oneTimeout,
    twoTimeout,
    threeTimeout,
    winTimeout,
    deathTimeout
  };

  for (const p in timeouts) {

    if (!timeouts[p]) {
      continue;
    }

    timeouts[p]--;

    if (!timeouts[p]) {
      handlers[`${p}Timeout`](params);
    }

  }

};

//exports

module.exports = { timeoutHandler };

"use strict";

//arr equal

const arrEqual = (a, b) => a.toString() === b.toString();

//bind object

const bindObject = (to, from = to) => {
  for (const p in from) {

    const prop = from[p];

    switch (typeof prop) {
      case "function":
        from[p] = prop.bind(to);
        break;
      case "object":
        bindObject(to, prop);
    }

  }
};

//chance

const chance = (val) => Math.random() >= (100 - val) / 100;

//cycle items

const cycleItems = (arr, val) => arr[(arr.indexOf(val) + 1) % arr.length];

//get json

const getJSON = (url, body) => fetch(url, body).then((res) => {

  if (!res.ok) {
    throw Error(`${res.status} ${res.statusText}`);
  }

  return res.json();

});

//init deep copy

const initDeepCopy = (config) => (...args) => {

  const defaults = {
    arr: true,
    obj: false
  };

  const init = Object.assign(defaults, config);

  const mergeFn = (to, from) => {

    for (const p in from) {

      const prop = from[p];
      const overwrite = Array.isArray(to[p]) ? init.arr : init.obj;

      if (!prop || typeof prop !== "object") {

        to[p] = prop;

        continue;

      }

      if (to[p] === undefined || overwrite) {
        to[p] = Array.isArray(prop) ? [] : {};
      }

      mergeFn(to[p], prop);

    }

    return to;

  };

  return args.reduce(mergeFn, {});

};

//rng int

const rngInt = (min, max, inclusive = false) => Math.floor(Math.random() * (max - min + (inclusive ? 1 : 0))) + min;

//round to

const roundTo = (val, dec) => Math.round(val * Math.pow(10, dec)) / Math.pow(10, dec);

//lead zero

const leadZero = (val) => `${val < 10 ? "0" : ""}${val}`;

//months

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

//send data

const sendData = (res) => (err, status, body) => {
  if (err) {
    res.sendStatus(502);
  } else {
    res.send(body);
  }
};

//storage key

const storageKey = (key, val, session) => {

  const store = session ? sessionStorage : localStorage;

  const namespace = location.pathname.split("/")
    .filter((e) => e)
    .join("-");

  const innerKey = `${namespace}-${key}`;
  const innerVal = JSON.stringify({ val });

  if (val === null || val === undefined) {
    return store[innerKey] && JSON.parse(store[innerKey]).val;
  }

  store[innerKey] = innerVal;

};

//wrap fn

const wrapFn = (fn, ...args) => () => fn(...args);

//exports

module.exports = {
  arrEqual,
  bindObject,
  chance,
  cycleItems,
  getJSON,
  initDeepCopy,
  rngInt,
  roundTo,
  leadZero,
  months,
  sendData,
  storageKey,
  wrapFn
};

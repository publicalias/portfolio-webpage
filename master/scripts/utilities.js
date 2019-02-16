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

const cycleItems = (arr, val, delta = 1) => {

  const i = arr.indexOf(val);
  const l = arr.length;

  const next = (i + delta) % l;

  return arr[next >= 0 ? next : l + next];

};

//encode api call

const encodeAPICall = ({ path, method, data }) => method === "GET" || method === "DELETE" ? {
  path: `${path}?data=${encodeURIComponent(JSON.stringify(data))}`,
  init: { method }
} : {
  path,
  init: {
    method,
    body: JSON.stringify(data),
    headers: new Headers({ "Content-Type": "application/json" })
  }
};

//get json

const getJSON = async (path, init) => {

  const res = await fetch(path, init);

  if (!res.ok) {
    throw Error(`${res.status} ${res.statusText}`);
  }

  return res.json();

};

//init deep copy

const initDeepCopy = (config) => (...args) => {

  const defaults = {
    array: true,
    object: false
  };

  const init = Object.assign(defaults, config);

  const mergeFn = (to, from) => {

    for (const p in from) {

      const prop = from[p];
      const overwrite = Array.isArray(to[p]) ? init.array : init.object;

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

//init storage key

const initStorageKey = (path) => (key, val, session) => {

  const store = session ? sessionStorage : localStorage;

  const namespace = path || location.pathname.split("/")
    .filter((e) => e)
    .join("-");

  const innerKey = `${namespace}-${key}`;
  const innerVal = JSON.stringify({ val });

  if (val === null || val === undefined) {
    return store[innerKey] && JSON.parse(store[innerKey]).val;
  }

  store[innerKey] = innerVal;

};

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

//rng int

const rngInt = (min, max, inclusive = false) => Math.floor(Math.random() * (max - min + (inclusive ? 1 : 0))) + min;

//round to

const roundTo = (val, dec) => Math.round(val * Math.pow(10, dec)) / Math.pow(10, dec);

//wrap fn

const wrapFn = (fn, ...args) => () => fn(...args);

//exports

module.exports = {
  arrEqual,
  bindObject,
  chance,
  cycleItems,
  encodeAPICall,
  getJSON,
  initDeepCopy,
  initStorageKey,
  leadZero,
  months,
  rngInt,
  roundTo,
  storageKey: initStorageKey(),
  wrapFn
};

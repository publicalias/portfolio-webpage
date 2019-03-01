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

//check errors

const checkErrors = (errors) => errors.filter((e) => e.bool).map((e) => e.text);

//cycle items

const cycleItems = (arr, val, delta = 1) => {

  const i = arr.indexOf(val);
  const l = arr.length;

  const next = (i + delta) % l;

  return arr[next >= 0 ? next : l + next];

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

      if (!(p in to) || overwrite) {
        to[p] = Array.isArray(prop) ? [] : {};
      }

      mergeFn(to[p], prop);

    }

    return to;

  };

  return args.reduce(mergeFn, {});

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
  checkErrors,
  cycleItems,
  deepCopy: initDeepCopy(),
  initDeepCopy,
  leadZero,
  months,
  rngInt,
  roundTo,
  wrapFn
};

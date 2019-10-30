"use strict";

//alphabet

const alphabet = "abcdefghijklmnopqrstuvwxyz";

//bind object

const bindObject = (to, from = to) => {
  for (const [key, val] of Object.entries(from)) {
    switch (typeof val) {
      case "function":
        from[key] = val.bind(to);
        break;
      case "object":
        if (val !== null) {
          bindObject(to, val);
        }
    }
  }
};

//capitalize

const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

//chance

const chance = (val) => Math.random() >= (100 - val) / 100;

//check errors

const checkErrors = (errors) => errors.filter((e) => e.bool).map((e) => e.text);

//cycle items

const cycleItems = (arr, val, delta = 1) => {

  const i = arr.indexOf(val);
  const l = arr.length;

  const next = ((i === -1 && Math.sign(delta) !== 1 ? 0 : i) + delta) % l;

  return arr[next >= 0 ? next : l + next];

};

//get

const get = (obj, key) => key.split(".").reduce((acc, e) => {

  const valid = acc && typeof acc === "object" || typeof acc === "function";

  return valid ? acc[e] : null;

}, obj);

//init deep copy / deep copy

const initDeepCopy = (config) => (...args) => {

  const isObject = (val) => val && typeof val === "object";

  const ignore = (val) => {

    const { ignoreNull, ignoreUndefined } = Object.assign({
      ignoreNull: false,
      ignoreUndefined: false
    }, config);

    return val === null && ignoreNull || val === undefined && ignoreUndefined;

  };

  const overwrite = (val) => {

    const { overwriteArray, overwriteObject } = Object.assign({
      overwriteArray: true,
      overwriteObject: false
    }, config);

    return Array.isArray(val) ? overwriteArray : overwriteObject;

  };

  const newObj = (val) => Array.isArray(val) ? [] : {};

  const mergeFn = (to, from) => {

    for (const [key, val] of Object.entries(from)) {

      if (ignore(val)) {
        continue;
      }

      if (!isObject(val)) {

        to[key] = val;

        continue;

      }

      if (!(key in to) || to[key] === null || overwrite(val)) {
        to[key] = newObj(val);
      }

      mergeFn(to[key], val);

    }

    return to;

  };

  return args.filter(isObject).reduce(mergeFn, newObj(args[0]));

};

const deepCopy = initDeepCopy();

//lead zero

const leadZero = (int, digits = 2) => {

  const str = `${int}`;
  const add = Array(Math.max(0, digits - str.length))
    .fill(0)
    .join("");

  return `${add}${str}`;

};

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

//obj equal

const objEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

//read date

const readDate = (unix) => {

  const date = new Date(unix);

  const d = date.getDate();
  const m = months[date.getMonth()];
  const y = date.getFullYear();

  return `${d} ${m} ${y}`;

};

//rng int

const rngInt = (min, max, inc = false) => Math.floor(Math.random() * (max - min + Number(inc))) + min;

//round to

const roundTo = (val, dec) => Math.round(val * 10 ** dec) / 10 ** dec;

//to precision

const toPrecision = (n, sf = 15) => {

  const x = parseFloat(Number(n).toPrecision(sf));
  const y = 10 ** sf;

  return x < y ? x.toString() : x.toExponential();

};

//exports

module.exports = {
  alphabet,
  bindObject,
  capitalize,
  chance,
  checkErrors,
  cycleItems,
  deepCopy,
  get,
  initDeepCopy,
  leadZero,
  months,
  objEqual,
  readDate,
  rngInt,
  roundTo,
  toPrecision
};

"use strict";

//alphabet

const alphabet = "abcdefghijklmnopqrstuvwxyz";

//arr equal

const arrEqual = (a, b) => a.toString() === b.toString();

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

//init deep copy / deep copy

const initDeepCopy = (config) => (...args) => {

  const overwrite = (val) => {

    const { array, object } = Object.assign({
      array: true,
      object: false
    }, config);

    return Array.isArray(val) ? array : object;

  };

  const newObj = (val) => Array.isArray(val) ? [] : {};

  const mergeFn = (to, from) => {

    for (const [key, val] of Object.entries(from)) {

      if (typeof val !== "object" || val === null) {

        to[key] = val;

        continue;

      }

      if (!(key in to) || overwrite(val)) {
        to[key] = newObj(val);
      }

      mergeFn(to[key], val);

    }

    return to;

  };

  return args.reduce(mergeFn, newObj(args[0]));

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

const roundTo = (val, dec) => Math.round(val * Math.pow(10, dec)) / Math.pow(10, dec);

//to precision

const toPrecision = (n, sf = 15) => {

  const x = parseFloat(Number(n).toPrecision(sf));
  const y = Math.pow(10, sf);

  return x < y ? x.toString() : x.toExponential();

};

//truncate

const truncate = (str, length) => str.length < length ? str : `${str.slice(0, length - 3)}...`;

//exports

module.exports = {
  alphabet,
  arrEqual,
  bindObject,
  chance,
  checkErrors,
  cycleItems,
  deepCopy,
  initDeepCopy,
  leadZero,
  months,
  readDate,
  rngInt,
  roundTo,
  toPrecision,
  truncate
};

"use strict";

//global imports

const { toPrecision } = require("utilities");

//get votes

const getVotes = (n) => {

  const check = (pow, symbol) => {

    const val = n / Math.pow(10, pow);
    const str = `${toPrecision(val, 3)}${symbol}`;

    return val >= 1 && str;

  };

  const k = check(3, "K");
  const m = check(6, "M");
  const b = check(9, "B");

  return b || m || k || n;

};

//exports

module.exports = { getVotes };

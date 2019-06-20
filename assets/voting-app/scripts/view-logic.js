"use strict";

//global imports

const { toPrecision } = require("utilities");

//get votes

const getVotes = (n) => {

  const check = (mag, symbol) => {

    const val = n / 10 ** mag;
    const cap = 10 ** 3;
    const str = val >= cap ? "???" : `${toPrecision(val, 3)}${symbol}`;

    return val >= 1 && str;

  };

  const k = check(3, "K");
  const m = check(6, "M");

  return m || k || n;

};

//exports

module.exports = { getVotes };

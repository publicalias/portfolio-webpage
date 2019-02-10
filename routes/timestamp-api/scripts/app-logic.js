"use strict";

//global imports

const { months } = require(`${__rootdir}/master/scripts/utilities`);

//node modules

const chrono = require("chrono-node");

//utilities

const createRes = (input, type, results) => ({
  input,
  type,
  results
});

const formalDate = (d, m, y) => `${d} ${months[m - 1]} ${y}`;

//parse date

const parseNatural = (date, natural) => {

  const results = natural.map((e) => {

    const kv = e.start.knownValues;
    const iv = e.start.impliedValues;

    return {
      parsed: e.text,
      unix: new Date(e.ref).getTime(),
      formal: formalDate(kv.day || iv.day, kv.month || iv.month, kv.year || iv.year)
    };

  });

  return createRes(date, "natural", results);

};

const parseUnix = (date, unix) => {

  const results = [{
    parsed: date,
    unix: Number(date),
    formal: formalDate(unix.getDate(), unix.getMonth() + 1, unix.getFullYear())
  }];

  return createRes(date, "unix", results);

};

const parseDate = (date) => {

  const natural = chrono.parse(date);
  const unix = new Date(Number(date));

  if (natural.length) {
    return parseNatural(date, natural);
  } else if (unix.toString() !== "Invalid Date") {
    return parseUnix(date, unix);
  }

};

//exports

module.exports = { parseDate };

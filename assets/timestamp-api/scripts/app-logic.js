"use strict";

//node modules

const chrono = require("chrono-node");

//utilities

const createRes = (input, type, results) => ({
  input,
  type,
  results
});

//parse date

const parseDate = (input) => {

  const natural = chrono.parse(input);
  const unix = new Date(Number(input));

  const mapFn = (e) => ({
    parsed: e.text,
    unix: e.date.getTime(),
    formal: e.date
  });

  if (natural.length) {

    const results = natural.map((e) => ({
      text: e.text,
      date: new Date(e.start.date())
    })).map(mapFn);

    return createRes(input, "natural", results);

  } else if (unix.toString() !== "Invalid Date") {

    const results = [{
      text: input,
      date: unix
    }].map(mapFn);

    return createRes(input, "unix", results);

  }

};

//exports

module.exports = { parseDate };

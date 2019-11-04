"use strict";

//global imports

const { cycleItems, get } = require("all/utilities");

//node modules

const dateFormat = require("dateformat");

//get hours

const getHours = (venue) => {

  const open = get(venue, "hours.0.is_open_now");

  const getTime = (key) => {

    const day = cycleItems([0, 1, 2, 3, 4, 5, 6], new Date().getDay() + (open ? 0 : 1), -1);

    return get(venue, `hours.0.open.${day}.${key}`) || "0000";

  };

  const setTime = (val) => {

    const date = new Date(0);

    date.setHours(...val.match(/\d{2}/g));

    return dateFormat(date, "h:MM TT");

  };

  const start = setTime(getTime("start"));
  const end = setTime(getTime("end"));

  return open ? `Open - Closes at ${end}` : `Closed - Opens at ${start}`;

};

//exports

module.exports = { getHours };

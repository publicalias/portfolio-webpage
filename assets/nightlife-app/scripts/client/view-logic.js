"use strict";

//global imports

const { itemIsInView } = require("all/client-utils");
const { select } = require("all/dom-api");
const { cycleItems, get, leadZero } = require("all/utilities");

//node modules

const dateFormat = require("dateformat");

//get hours

const getHours = (venue) => {

  const getTime = () => {

    const date = new Date();
    const time = `${leadZero(date.getHours())}${leadZero(date.getMinutes())}`;

    const getKey = (offset, key) => {

      const day = cycleItems([0, 1, 2, 3, 4, 5, 6], date.getDay() + offset, -1);

      return get(venue, `hours.0.open.${day}.${key}`) || "0000";

    };

    const start = getKey(0, "start");
    const end = getKey(0, "end");
    const after = getKey(1, "start");

    if (time < start) {
      return [false, start];
    } else if (time < end) {
      return [true, end];
    }

    return [false, after];

  };

  const setTime = ([open, time]) => {

    const date = new Date(0);

    date.setHours(...time.match(/\d{2}/g));

    return [open, dateFormat(date, "h:MM TT")];

  };

  const [open, time] = setTime(getTime());

  return open ? `Open - Closes at ${time}` : `Closed - Opens at ${time}`;

};

//get shown

const getShown = () => {

  const navHeight = select(".js-ref-nav-bar").rect().height;

  return itemIsInView(".js-ref-carousel", navHeight);

};

//exports

module.exports = {
  getHours,
  getShown
};

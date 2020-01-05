"use strict";

//global imports

const { itemIsInView } = require("all/client-utils");
const { select } = require("all/dom-api");
const { cycleItems, get } = require("all/utilities");

//node modules

const dateFormat = require("dateformat");

//get hours

const getHours = (venue) => {

  const date = new Date(); //assumes correct time zone

  const num = cycleItems([0, 1, 2, 3, 4, 5, 6], date.getDay(), -1);

  const open = get(venue, "hours.0.open");
  const day = open && open.find((e) => e.day === num);
  const time = get(day, "end");

  return !get(venue, "hours.0.is_open_now") || !time ? "Closed" : (() => {

    if (day.start === "0000" && day.end === "0000") {
      return "Open 24 Hours";
    }

    const date = new Date(0);

    date.setHours(...time.match(/\d{2}/g));

    return `Closes at ${dateFormat(date, "h:MM TT")}`;

  })();

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

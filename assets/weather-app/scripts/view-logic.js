"use strict";

//global imports

const { select } = require("dom-api");

//init display

const thermoClass = (temp) => {

  let thermo = "0";

  if (temp > 30) {
    thermo = "4";
  } else if (temp > 20) {
    thermo = "3";
  } else if (temp > 10) {
    thermo = "2";
  } else if (temp > 0) {
    thermo = "1";
  }

  return `fa-thermometer-${thermo}`;

};

const initDisplay = (res, temp) => {

  select(".js-edit-thermo").class(`fa-thermometer-0 ${thermoClass(temp)}`, true);

  $(".js-edit-city").text(res.name);
  $(".js-edit-country").text(res.sys.country);
  $(".js-edit-temp").text(temp);

  $(".js-edit-weather").attr("src", `https://openweathermap.org/img/w/${res.weather[0].icon}.png`);

};

//toggle metric

const toggleMetric = (temp, unit) => {

  $(".js-edit-temp").text(temp);
  $(".js-edit-unit").text(unit);

  select(".js-edit-toggle").class("fa-toggle-off fa-toggle-on", true);

};

//exports

module.exports = {
  initDisplay,
  toggleMetric
};

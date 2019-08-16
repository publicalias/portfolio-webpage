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

  select(".js-edit-city").text(res.name);
  select(".js-edit-country").text(res.sys.country);
  select(".js-edit-temp").text(temp);

  select(".js-edit-weather").src = `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;

};

//toggle metric

const toggleMetric = (temp, unit) => {

  select(".js-edit-temp").text(temp);
  select(".js-edit-unit").text(unit);

  select(".js-edit-toggle").class("fa-toggle-off fa-toggle-on", true);

};

//exports

module.exports = {
  initDisplay,
  toggleMetric
};

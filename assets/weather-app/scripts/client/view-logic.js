"use strict";

//global imports

const { select } = require("all/dom-api");

//init display

const thermoClass = (temp) => {

  let thermo = "empty";

  if (temp > 30) {
    thermo = "full";
  } else if (temp > 20) {
    thermo = "three-quarters";
  } else if (temp > 10) {
    thermo = "half";
  } else if (temp > 0) {
    thermo = "quarter";
  }

  return `fas fa-thermometer-${thermo}`;

};

const initDisplay = (res, temp) => {

  select(".js-edit-thermo").class(`fas fa-thermometer-empty ${thermoClass(temp)}`, true);

  select(".js-edit-city").text(res.name);
  select(".js-edit-country").text(res.sys.country);
  select(".js-edit-temp").text(temp);

  select(".js-edit-weather").src = `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;

};

//toggle metric

const toggleMetric = (temp, unit) => {

  select(".js-edit-temp").text(temp);
  select(".js-edit-unit").text(unit);

  select(".js-edit-toggle").class("fas fa-toggle-off fas fa-toggle-on", true);

};

//exports

module.exports = {
  initDisplay,
  toggleMetric
};

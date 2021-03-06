"use strict";

//local imports

const { initDisplay, toggleMetric } = require("./scripts/client/view-logic");

//global imports

const { checkInput, getJSON } = require("all/client-utils");
const { select } = require("all/dom-api");
const { bindObject } = require("all/utilities");

//app logic

const app = {

  degC: "0.0",
  degF: "0.0",
  unit: "degC",

  //get weather

  async getWeather({ coords: { latitude: lat, longitude: lon } }) {

    const res = await getJSON(`/weather-app/weather?lat=${lat}&lon=${lon}`);

    this.display(res);

  },

  //initialize display

  display(res) {

    if (!res.main) {
      return;
    }

    this.degC = (res.main.temp - 273.15).toFixed(1);
    this.degF = (res.main.temp * 9 / 5 - 459.67).toFixed(1);

    initDisplay(res, this.degC);

  },

  //toggle metric

  toggle() {

    this.unit = this.unit === "degC" ? "degF" : "degC";

    toggleMetric(this[this.unit], this.unit[3]);

  }

};

//initialize app

bindObject(app);

select(document).on("DOMContentLoaded", () => {

  checkInput();

  navigator.geolocation.getCurrentPosition(app.getWeather);

  select(".js-click-toggle").on("click", app.toggle);

});

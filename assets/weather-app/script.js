"use strict";

//local imports

const { initDisplay, toggleMetric } = require("./scripts/view-logic");

//global imports

const { bindObject, getJSON } = require("utilities");

//app logic

const app = {

  degC: "0.0",
  degF: "0.0",
  unit: "degC",

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

$(() => {

  getJSON("/weather-app/weather").then(app.display);

  $(".js-click-toggle").click(app.toggle);

});

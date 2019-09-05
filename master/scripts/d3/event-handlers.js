"use strict";

//global imports

const { select } = require("all/dom-api");

//node modules

const d3 = require("d3");

//check tooltip

const checkTooltip = (app) => (d) => {

  //ensures mobile support

  d3.event.stopPropagation();

  app.handleMouseLeave();
  app.handleMouseEnter(d);

};

//global events

const globalEvents = (app) => () => {

  app.ready++;
  app.getSVG();

  select(".js-ref-svg").on("touchstart", app.handleMouseLeave, { passive: true });

};

//exports

module.exports = {
  checkTooltip,
  globalEvents
};

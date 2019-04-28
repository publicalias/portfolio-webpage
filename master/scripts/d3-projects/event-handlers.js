"use strict";

//local imports

const { select } = require("../dom-api");

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

  select(window).on("resize scroll", () => {
    app.handleMouseLeave();
  });

  select(".js-ref-svg").on("touchstart", app.handleMouseLeave, { passive: true }); //ensures mobile support

};

//exports

module.exports = {
  checkTooltip,
  globalEvents
};

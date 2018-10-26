"use strict";

//global imports

const { listen, wrapFn } = require("utilities");

//check tooltip

const checkTooltip = (app) => (d) => {

  //ensures mobile support

  d3.event.stopPropagation();

  app.handleMouseLeave();
  app.handleMouseEnter(d);

};

//window events

const windowEvents = (app) => () => {

  app.ready++;
  app.getSVG();

  listen(window, "scroll", wrapFn(app.handleMouseLeave));

  //ensures mobile support

  listen(".js-ref-svg", "touchstart", app.handleMouseLeave);

};

//exports

module.exports = {
  checkTooltip,
  windowEvents
};

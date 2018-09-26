"use strict";

//global imports

const { wrapFn } = require("utilities");

//check tooltip

const checkTooltip = (app) => (d) => {

  //ensures mobile support

  d3.event.stopPropagation();

  app.handleMouseLeave();
  app.handleMouseEnter(d);

};

//window events

const windowEvents = (app) => () => {

  const $window = $(window);

  app.ready++;
  app.getSVG();

  $window.scroll(wrapFn(app.tooltip));

  //ensures mobile support

  $(".js-ref-svg").click(app.handleMouseLeave);

};

//exports

module.exports = {
  checkTooltip,
  windowEvents
};

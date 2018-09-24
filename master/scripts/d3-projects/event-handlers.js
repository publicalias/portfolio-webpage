"use strict";

//global imports

const { wrapFn } = require("utilities");

//window events

const windowEvents = (app) => () => {

  const $window = $(window);

  app.ready++;
  app.getSVG();

  $window.scroll(wrapFn(app.tooltip));

};

//exports

module.exports = { windowEvents };

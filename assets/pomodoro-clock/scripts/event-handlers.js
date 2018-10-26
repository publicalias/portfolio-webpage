"use strict";

//global imports

const { bindObject, listen } = require("utilities");

//utilities

const utils = {

  button: false,

  //toggle timer

  toggle(app) {
    return () => {

      const timerOn = app.workInt || app.breakInt;

      if (timerOn) {
        app.stop();
      } else if (!this.button) {
        app.start();
      }

    };
  },

  //track mouse

  hover(bool) {
    return () => {
      this.button = bool;
    };
  }

};

bindObject(utils);

//click events

const clickEvents = (app) => {

  listen(".js-click-work-plus", "click", app.set(true, 5));
  listen(".js-click-work-minus", "click", app.set(true, -5));
  listen(".js-click-break-plus", "click", app.set(false, 5));
  listen(".js-click-break-minus", "click", app.set(false, -5));

  listen(".js-toggle-timer", "click", utils.toggle(app));

};

//hover events

const hoverEvents = () => {

  const DOMToggle = document.querySelectorAll(".js-toggle-btn");

  listen(DOMToggle, "mouseenter", utils.hover(true));
  listen(DOMToggle, "mouseleave", utils.hover());

};

//exports

module.exports = {
  clickEvents,
  hoverEvents
};

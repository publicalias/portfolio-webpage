"use strict";

//global imports

const { select } = require("all/dom-api");
const { bindObject } = require("all/utilities");

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

  const buttons = ["work-plus", "work-minus", "break-plus", "break-minus"];

  for (const e of buttons) {

    const [timer, delta] = e.split("-");

    const bool = timer === "work";
    const val = 5 * (delta === "plus" ? 1 : -1);

    select(`.js-click-${e}`).on("click", app.set(bool, val));

  }

  select(".js-toggle-timer").on("click", utils.toggle(app));

};

//hover events

const hoverEvents = () => {
  select(".js-toggle-disabled")
    .on("mouseenter", utils.hover(true))
    .on("mouseleave", utils.hover());
};

//exports

module.exports = {
  clickEvents,
  hoverEvents
};

"use strict";

//global imports

const { wrapFn } = require("utilities");

//button events

const buttonEvents = (app) => {

  const fns = ["dec", "ms", "mc", "mr", "mp", "mm", "radix", "square", "frac", "neg", "ce", "c", "del", "equals"];

  for (const e of fns) {
    $(`.js-click-${e}`).click(app[e]);
  }

  for (let i = 0; i < 10; i++) {
    $(`.js-click-${i}`).click(wrapFn(app.num, i.toString()));
  }

  $(".js-click-div").click(wrapFn(app.arith, "/"));
  $(".js-click-mult").click(wrapFn(app.arith, "*"));
  $(".js-click-sub").click(wrapFn(app.arith, "-"));
  $(".js-click-add").click(wrapFn(app.arith, "+"));

};

//key events

const keyEvents = (app) => {
  $(window).keydown((event) => {
    switch (event.key) {
      case ".":
        app.dec(true);
        break;
      case "+":
        event.preventDefault();
      case "-":
      case "*":
      case "/":
        app.arith(event.key, true);
        break;
      case "Backspace":
        app.del(true);
        break;
      case "=":
        app.equals(true);
        break;
      default:
        if (isFinite(event.key)) {
          app.num(event.key, true);
        }
    }
  });
};

//exports

module.exports = {
  buttonEvents,
  keyEvents
};

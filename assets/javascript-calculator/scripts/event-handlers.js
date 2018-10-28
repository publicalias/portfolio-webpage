"use strict";

//global imports

const { listen } = require("dom-utils");
const { wrapFn } = require("utilities");

//button events

const buttonEvents = (app) => {

  const fns = ["dec", "ms", "mc", "mr", "mp", "mm", "radix", "square", "frac", "neg", "ce", "c", "del", "equals"];
  const ops = [{
    id: ".js-click-div",
    op: "/"
  }, {
    id: ".js-click-mult",
    op: "*"
  }, {
    id: ".js-click-sub",
    op: "-"
  }, {
    id: ".js-click-add",
    op: "+"
  }];

  for (const e of fns) {
    listen(`.js-click-${e}`, "click", app[e]);
  }

  for (const e of ops) {
    listen(e.id, "click", wrapFn(app.arith, e.op));
  }

  for (let i = 0; i < 10; i++) {
    listen(`.js-click-${i}`, "click", wrapFn(app.num, i.toString()));
  }

};

//key events

const keyEvents = (app) => {
  listen(window, "keydown", (event) => {
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
        event.preventDefault();
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

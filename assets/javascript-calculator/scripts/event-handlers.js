"use strict";

//global imports

const { select } = require("dom-api");

//button events

const buttonEvents = (app) => {

  const buttons = {
    special: ["dec", "ms", "mc", "mr", "mp", "mm", "radix", "square", "frac", "neg", "ce", "c", "del", "equals"],
    basic: [{
      id: "div",
      operator: "/"
    }, {
      id: "mult",
      operator: "*"
    }, {
      id: "sub",
      operator: "-"
    }, {
      id: "add",
      operator: "+"
    }]
  };

  for (const e of buttons.special) {
    select(`.js-click-${e}`).on("click", app[e]);
  }

  for (const e of buttons.basic) {
    select(`.js-click-${e.id}`).on("click", () => {
      app.arith(e.operator);
    });
  }

  for (let i = 0; i < 10; i++) {
    select(`.js-click-${i}`).on("click", () => {
      app.num(i.toString());
    });
  }

};

//key events

const keyEvents = (app) => {
  select(window).on("keydown", (event) => {
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

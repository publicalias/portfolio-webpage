"use strict";

//local imports

const { clickEvents, hoverEvents } = require("./scripts/event-handlers");
const { emptyBar, playSound, readTime, toggleSet } = require("./scripts/view-logic");

//global imports

const { checkInput } = require("check-input");
const { bindObject, listen, storageKey } = require("utilities");

//app logic

const app = {

  workSet: storageKey("work") || 25,
  breakSet: storageKey("break") || 5,
  workCount: null,
  breakCount: null,
  workInt: null,
  breakInt: null,

  //reset timer

  reset() {

    this.workCount = this.workSet * 60;
    this.breakCount = this.breakSet * 60;

    readTime(this.workSet, this.workCount, "work");
    readTime(this.breakSet, this.breakCount, "break");
    emptyBar();

  },

  //start timer

  start() {

    toggleSet(true);

    if (this.workCount) {
      this.workInt = setInterval(() => {
        if (this.workCount) {
          this.workCount--;
          readTime(this.workSet, this.workCount, "work");
        } else {
          clearInterval(this.workInt);
          setTimeout(this.start, 1000);
          playSound();
        }
      }, 1000);
    } else {
      this.breakInt = setInterval(() => {
        if (this.breakCount) {
          this.breakCount--;
          readTime(this.breakSet, this.breakCount, "break");
        } else {
          clearInterval(this.breakInt);
          setTimeout(this.reset, 1000);
          setTimeout(this.start, 1000);
          playSound();
        }
      }, 1000);
    }

  },

  //stop timer

  stop() {

    clearInterval(this.workInt);
    clearInterval(this.breakInt);

    this.workInt = null;
    this.breakInt = null;

    toggleSet();

  },

  //set timer

  set(isWork, delta) {
    return () => {

      if (this.workInt || this.breakInt) {
        return;
      }

      const set = isWork ? "workSet" : "breakSet";
      const key = isWork ? "work" : "break";

      if (delta === 5 && this[set] < 60 || delta === -5 && this[set] > 5) {
        this[set] += delta;
      }

      storageKey(key, this[set]);

      this.reset();

    };
  }

};

//initialize app

bindObject(app);

listen(document, "DOMContentLoaded", () => {

  checkInput();

  clickEvents(app);
  hoverEvents();

  app.reset();
  app.start();

});

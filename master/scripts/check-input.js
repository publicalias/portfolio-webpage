"use strict";

//global imports

const { select } = require("dom-api");
const { bindObject } = require("utilities");

//check input

const utils = {

  timer: null,
  block: false,

  isTouch() {

    clearTimeout(this.timer);

    this.block = true;

    this.timer = setTimeout(() => {
      this.block = false;
    }, 1000);

    $(".js-check-input")
      .removeClass("is-mouse")
      .addClass("is-touch");

  },

  isMouse() {

    if (this.block) {
      return;
    }

    $(".js-check-input")
      .addClass("is-mouse")
      .removeClass("is-touch");

  }

};

bindObject(utils);

const checkInput = () => {
  select(".js-check-input")
    .on("touchstart", utils.isTouch)
    .on("mouseover", utils.isMouse);
};

//exports

module.exports = { checkInput };

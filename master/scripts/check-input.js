"use strict";

//global imports

const { select } = require("dom-api");
const { bindObject } = require("utilities");

//check input

const DOMInput = select(".js-check-input");

const utils = {

  timer: null,
  block: false,

  isTouch() {

    clearTimeout(this.timer);

    this.block = true;

    this.timer = setTimeout(() => {
      this.block = false;
    }, 500);

    DOMInput.class("is-mouse", true, false).class("is-touch", true, true);

  },

  isMouse() {

    if (this.block) {
      return;
    }

    DOMInput.class("is-mouse", true, true).class("is-touch", true, false);

  }

};

bindObject(utils);

const checkInput = () => {
  DOMInput.on("touchstart", utils.isTouch).on("mouseover", utils.isMouse);
};

//exports

module.exports = { checkInput };

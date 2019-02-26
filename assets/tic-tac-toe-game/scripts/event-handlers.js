"use strict";

//global imports

const { toggleModal } = require("components/modal");
const { select } = require("dom-api");
const { bindObject } = require("utilities");

//utilities

const utils = {

  prompt: 1,

  //update prompt

  updatePrompt(val) {

    const DOMQuestion = select(".js-edit-question");
    const DOMLeft = select(".js-click-option-left");
    const DOMRight = select(".js-click-option-right");

    this.prompt = val;

    switch (this.prompt) {
      case 1:
        DOMQuestion.text("Single player?");
        DOMLeft.text("Y");
        DOMRight.text("N");
        break;
      case 2:
        DOMQuestion.animate({ opacity: 0 }, () => {
          DOMQuestion.text("Play as X or O?").animate({ opacity: 1 });
        });
        DOMLeft.animate({ opacity: 0 }, () => {
          DOMLeft.text("X").animate({ opacity: 1 });
        });
        DOMRight.animate({ opacity: 0 }, () => {
          DOMRight.text("O").animate({ opacity: 1 });
        });
    }

  },

  //game settings

  settings(app, bool, val) {
    return () => {

      const handleInput = () => {
        if (bool) {
          this.updatePrompt(2);
        } else {
          toggleModal();
        }
      };

      switch (this.prompt) {
        case 1:
          app.setSingle(bool);
          handleInput();
          break;
        case 2:
          app.setPlayer(val);
          toggleModal();
      }

    };
  }

};

bindObject(utils);

//click events

const clickEvents = (app) => {

  select(".js-click-restart").on("click", () => {
    app.restart();
    utils.updatePrompt(1);
    toggleModal(true);
  });

  select(".js-click-option-left").on("click", utils.settings(app, true, 1));
  select(".js-click-option-right").on("click", utils.settings(app, false, -1));

  for (let i = 0; i < 9; i++) {
    select(`.js-click-cell-${i}`).on("click", app.move(i));
  }

};

//exports

module.exports = { clickEvents };

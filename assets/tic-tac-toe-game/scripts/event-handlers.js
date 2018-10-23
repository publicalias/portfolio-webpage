"use strict";

//global imports

const { toggleModal } = require("modal");
const { animate, bindObject } = require("utilities");

//utilities

const utils = {

  prompt: 1,

  //update prompt

  updatePrompt(val) {

    const $question = $(".js-edit-question");
    const $left = $(".js-click-option-left");
    const $right = $(".js-click-option-right");

    this.prompt = val;

    switch (this.prompt) {
      case 1:
        $question.text("Single player?");
        $left.text("Y");
        $right.text("N");
        break;
      case 2:
        animate($question, { opacity: 0 }, () => {
          animate($question.text("Play as X or O?"), { opacity: 1 });
        });
        animate($left, { opacity: 0 }, () => {
          animate($left.text("X"), { opacity: 1 });
        });
        animate($right, { opacity: 0 }, () => {
          animate($right.text("O"), { opacity: 1 });
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

  $(".js-click-restart").click(() => {
    app.restart();
    utils.updatePrompt(1);
    toggleModal(true);
  });

  $(".js-click-option-left").click(utils.settings(app, true, 1));
  $(".js-click-option-right").click(utils.settings(app, false, -1));

  for (let i = 0; i < 9; i++) {
    $(`.js-click-cell-${i}`).click(app.move(i));
  }

};

//exports

module.exports = { clickEvents };

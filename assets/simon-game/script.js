"use strict";

//local imports

const { handlePlayback, stopPlayback } = require("./scripts/app-logic");
const { gameplayEvents, settingEvents } = require("./scripts/event-handlers");
const { audio, btnIDs, display, renderButtons, toggleBlock, toggleHover } = require("./scripts/view-logic");

//global imports

const { bindObject, cycleItems, rngInt } = require("utilities");

//app logic

const app = {

  sequence: [],
  response: [],
  strict: true,
  stepsVal: 20,

  //start round

  start() {

    this.sequence.push(rngInt(0, 3, true));
    this.play();

    display(this.sequence.length);

  },

  //restart game

  restart() {
    this.sequence = [];
    this.start();
  },

  //play sequence

  play() {

    toggleBlock(true);

    this.response = [];

    let i = 0;

    const playInt = setInterval(() => {

      const num = this.sequence[i];

      handlePlayback(audio.btn[num]);

      i++;

      if (i === this.sequence.length) {
        stopPlayback(playInt);
      }

    }, 1000);

  },

  //check response

  check(num) {
    if (num === this.sequence[this.response.length - 1]) {
      if (this.response.length === this.sequence.length) {
        if (this.sequence.length === this.stepsVal) {
          setTimeout(() => {
            audio.win.play();
          }, 1000);
          setTimeout(this.restart, 5000);
        } else {
          setTimeout(this.start, 1000);
        }
      } else {
        setTimeout(toggleBlock, 500);
      }
    } else {
      setTimeout(() => {
        audio.lose.play();
      }, 1000);
      setTimeout(this.strict ? this.restart : this.play, 5000);
    }
  },

  //play button

  playBtn(num) {
    return () => {

      if ($(`.js-click-btn-${btnIDs[num]}`).hasClass("is-disabled")) {
        return;
      }

      toggleBlock(true); //prevents input overload

      handlePlayback(audio.btn[num]);

      setTimeout(toggleHover, 500);

      if (this.sequence.length) {
        this.response.push(num);
        this.check(num);
      } else {
        setTimeout(toggleBlock, 500);
      }

    };
  },

  //steps button

  stepsBtn() {

    if (this.sequence.length) {
      return;
    }

    this.stepsVal = cycleItems([10, 20, 30], this.stepsVal);

    display(null, this.stepsVal);

  },

  //start button

  startBtn() {
    if (this.sequence.length) {
      this.play();
    } else {
      this.start();
    }
  },

  //restart button

  restartBtn() {
    if (this.sequence.length > 1) {
      this.restart();
    } else {

      this.sequence = [];
      this.strict = true;
      this.stepsVal = 20;

      display(0, 20, true);

    }
  },

  //strict button

  strictBtn() {

    if (this.sequence.length) {
      return;
    }

    this.strict = !this.strict;

    display(null, null, this.strict);

  }

};

//initialize app

bindObject(app);

$(() => {
  renderButtons();
  gameplayEvents(app);
  settingEvents(app);
});

"use strict";

//global imports

const { select } = require("all/dom-api");
const { leadZero } = require("all/utilities");

//empty bar

const emptyBar = () => {
  select(".js-edit-progress-bar").css({ width: 0 });
};

//play sound

const sound = new Audio("/pomodoro-clock/media/squawk.wav");

const playSound = () => {
  sound.play();
};

//read time

const readTime = (set, count, id) => {

  const minutes = leadZero(Math.floor(count / 60));
  const seconds = leadZero(Math.round(count % 60));

  const total = set * 60;
  const barWidth = (total - count) / total * 100;

  select(`.js-edit-${id}-timer`).text(`${minutes}:${seconds}`);

  select(".js-edit-progress-bar").css({ width: `${barWidth}%` });

};

//toggle set

const toggleSet = (bool = false) => {
  select(".js-toggle-disabled").class("is-disabled", true, bool);
};

//exports

module.exports = {
  emptyBar,
  playSound,
  readTime,
  toggleSet
};

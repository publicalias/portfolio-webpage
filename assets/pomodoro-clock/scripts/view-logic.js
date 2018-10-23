"use strict";

//global imports

const { leadZero } = require("utilities");

//empty bar

const emptyBar = () => {
  $(".js-edit-progress-bar").css({ width: 0 });
};

//play sound

const sound = new Audio("media/squawk.wav");

const playSound = () => {
  sound.play();
};

//read time

const readTime = (set, count, id) => {

  const total = set * 60;
  const barWidth = (total - count) / total * 100;

  $(`.js-edit-${id}-timer`).text(`${leadZero(Math.floor(count / 60))}:${leadZero(Math.round(count % 60))}`);

  $(".js-edit-progress-bar").css({ width: `${barWidth}%` });

};

//toggle set

const toggleSet = (bool = false) => {
  $(".js-toggle-btn").toggleClass("is-disabled", bool);
};

//exports

module.exports = {
  emptyBar,
  playSound,
  readTime,
  toggleSet
};

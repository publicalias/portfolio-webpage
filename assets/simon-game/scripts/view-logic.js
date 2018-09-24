"use strict";

//global imports

const { leadZero } = require("utilities");

//btn ids

const btnIDs = ["tl", "tr", "br", "bl"];

//audio

const createAudio = () => {

  const audio = {
    win: new Audio("media/clapping.wav"),
    lose: new Audio("media/booing.wav"),
    btn: []
  };

  const files = ["piano-a", "piano-b", "piano-c", "piano-d"];

  for (let i = 0; i < btnIDs.length; i++) {

    const btn = {
      id: `.js-click-btn-${btnIDs[i]}`,
      playback: 0,
      sound: []
    };

    for (let j = 0; j < 3; j++) {
      btn.sound.push(new Audio(`media/${files[i]}.wav`)); //allows layered playback
    }

    audio.btn.push(btn);

  }

  return audio;

};

const audio = createAudio();

//display

const display = (steps, total, strict) => {

  if (typeof steps === "number") {
    $(".js-edit-steps").text(leadZero(steps));
  }

  if (typeof total === "number") {
    $(".js-edit-total").text(total);
  }

  if (typeof strict === "boolean") {
    $(".js-edit-strict").text(strict ? "(Hard)" : "(Easy)");
  }

};

//render buttons

const renderButtons = () => {
  btnIDs.forEach((e, i) => {
    $(".js-render-buttons").append(`
      <svg class="c-simon-game__play-btn--${e}" viewBox="0 0 100 100">
        <path class="c-simon-game__btn-path--${e} js-click-btn-${e} js-hover-btn" d="M 0 100 H 47.5 A 57.5 57.5 0 0 1 100 47.5 V 0 A 107.5 107.5 0 0 0 0 100" transform="rotate(${i * 90}, 50, 50)" />
      </svg>
    `);
  });
};

//toggle block

const toggleBlock = (bool = false) => {
  $(".js-hover-btn").toggleClass("is-disabled", bool);
  $(".js-toggle-btn").prop("disabled", bool);
};

//toggle hover

const toggleHover = (id) => {
  if (id) {
    $(id).addClass("is-active");
  } else {
    $(".js-hover-btn").removeClass("is-active");
  }
};

//exports

module.exports = {
  audio,
  btnIDs,
  display,
  renderButtons,
  toggleBlock,
  toggleHover
};

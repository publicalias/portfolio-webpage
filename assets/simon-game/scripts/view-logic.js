"use strict";

//global imports

const { select } = require("all/dom-api");
const { leadZero } = require("all/utilities");

//btn ids

const btnIDs = ["tl", "tr", "br", "bl"];

//audio

const createAudio = () => {

  const audio = {
    win: new Audio("/simon-game/media/clapping.wav"),
    lose: new Audio("/simon-game/media/booing.wav"),
    btn: []
  };

  const files = ["piano-c", "piano-d", "piano-e", "piano-f"];

  for (let i = 0; i < btnIDs.length; i++) {

    const btn = {
      id: `.js-click-${btnIDs[i]}`,
      playback: 0,
      sound: []
    };

    for (let j = 0; j < 3; j++) {
      btn.sound.push(new Audio(`/simon-game/media/${files[i]}.wav`)); //allows layered playback
    }

    audio.btn.push(btn);

  }

  return audio;

};

const audio = createAudio();

//display

const display = (steps, total, strict) => {

  if (typeof steps === "number") {
    select(".js-edit-steps").text(leadZero(steps));
  }

  if (typeof total === "number") {
    select(".js-edit-total").text(total);
  }

  if (typeof strict === "boolean") {
    select(".js-edit-strict").text(strict ? "(Hard)" : "(Easy)");
  }

};

//render buttons

const renderButtons = () => {

  const DOMRender = select(".js-render-buttons");

  btnIDs.forEach((e, i) => {

    const html = `
      <svg class="c-simon-game__play-btn--${e}" viewBox="0 0 100 100">
        <path class="c-simon-game__btn-path--${e} js-click-${e} js-toggle-hover u-hover" d="M 0 100 H 47.5 A 57.5 57.5 0 0 1 100 47.5 V 0 A 107.5 107.5 0 0 0 0 100" transform="rotate(${i * 90}, 50, 50)" />
      </svg>
    `;

    DOMRender.html(html, true);

  });

};

//toggle block

const toggleBlock = (bool = false) => {

  select(".js-toggle-hover").class("is-disabled", true, bool);

  select(".js-toggle-disabled").disabled = bool;

};

//toggle hover

const toggleHover = (id) => {
  select(id || ".js-toggle-hover").class("is-hovered", true, id !== undefined);
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

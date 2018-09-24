"use strict";

//local imports

const { toggleBlock, toggleHover } = require("./view-logic");

//handle playback

const handlePlayback = (btn) => {

  btn.sound[btn.playback].play();
  btn.playback++;

  if (btn.playback === btn.sound.length) {
    btn.playback = 0;
  }

  toggleHover();
  toggleHover(btn.id);

};

//stop playback

const stopPlayback = (playInt) => {

  clearInterval(playInt);

  setTimeout(toggleBlock, 1000);
  setTimeout(toggleHover, 1000);

};

//exports

module.exports = {
  handlePlayback,
  stopPlayback
};

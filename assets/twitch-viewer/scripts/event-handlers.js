"use strict";

//global imports

const { submitKeys } = require("submit-keys");

//button events

const buttonEvents = () => {

  const filter = (online, offline, closed) => () => {

    const output = ".js-filter-output";

    const fade = (bool) => bool ? "fadeIn" : "fadeOut";

    $(`${output}.is-online`)[fade(online)]();
    $(`${output}.is-offline`)[fade(offline)]();
    $(`${output}.is-closed`)[fade(closed)]();

  };

  $(".js-filter-all").click(filter(true, true, true));
  $(".js-filter-on").click(filter(true, false, false));
  $(".js-filter-off").click(filter(false, true, false));

};

//submit events

const submitEvents = (submit) => {
  $(".js-submit-button").click(submit);
  $(window).keydown(submitKeys());
};

//exports

module.exports = {
  buttonEvents,
  submitEvents
};

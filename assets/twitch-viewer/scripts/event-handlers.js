"use strict";

//global imports

const { submitKeys } = require("submit-keys");
const { animate } = require("utilities");

//button events

const buttonEvents = () => {

  const filter = (online, offline, closed) => () => {

    const output = ".js-filter-output";

    const fade = ($group, bool) => {
      if (bool) {
        animate($group.removeClass("is-hidden"), { opacity: 1 });
      } else {
        animate($group, { opacity: 0 }, () => {
          $group.addClass("is-hidden");
        });
      }
    };

    fade($(`${output}.is-online`), online);
    fade($(`${output}.is-offline`), offline);
    fade($(`${output}.is-closed`), closed);

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

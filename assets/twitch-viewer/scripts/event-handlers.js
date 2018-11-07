"use strict";

//global imports

const { select } = require("dom-api");
const { submitKeys } = require("submit-keys");

//filter events

const handleFilter = (online, offline, closed) => () => {

  const output = ".js-filter-output";

  const fade = (DOMGroup, bool) => {
    if (bool) {
      DOMGroup.class("is-hidden", true, false).animate({ opacity: 1 });
    } else {
      DOMGroup.animate({ opacity: 0 }, () => {
        DOMGroup.class("is-hidden", true, true);
      });
    }
  };

  fade(select(`${output}.is-online`), online);
  fade(select(`${output}.is-offline`), offline);
  fade(select(`${output}.is-closed`), closed);

};

const filterEvents = () => {

  const buttons = [{
    id: "all",
    args: [true, true, true]
  }, {
    id: "on",
    args: [true, false, false]
  }, {
    id: "off",
    args: [false, true, false]
  }];

  for (const e of buttons) {
    select(`.js-filter-${e.id}`).on("click", handleFilter(...e.args));
  }

};

//submit events

const submitEvents = (submit) => {
  select(".js-submit-button").on("click", submit);
  submitKeys();
};

//exports

module.exports = {
  filterEvents,
  submitEvents
};

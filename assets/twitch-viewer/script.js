"use strict";

//local imports

const { filterEvents, submitEvents } = require("./scripts/event-handlers");
const { getOutput } = require("./scripts/view-logic");

//global imports

const { checkInput } = require("check-input");
const { select } = require("dom-api");
const { storageKey } = require("utilities");

//app logic

const search = (channels = "ESL_SC2, OgamingSC2, RobotCaleb, brunofin, comster404, cretetion, freecodecamp, habathcx, noobs2ninjas, storbeck") => {

  storageKey("channels", channels);

  select(".js-submit-input").value = channels;
  select(".js-render-output").html("");

  channels.split(", ").forEach(getOutput);

};

const submit = () => {

  let channels = select(".js-submit-input").value;

  if (!(/^(\w{4,25},\s)*\w{4,25}$/u).test(channels)) {
    return;
  }

  channels = channels.split(", ")
    .filter((e, i, arr) => arr.indexOf(e) === i)
    .sort()
    .join(", ");

  if (channels === storageKey("channels")) {
    return;
  }

  const DOMOutput = select(".js-render-output");

  DOMOutput.animate({ opacity: 0 }, () => {
    search(channels);
    DOMOutput.animate({ opacity: 1 });
  });

};

//initialize app

select(document).on("DOMContentLoaded", () => {

  checkInput();

  submitEvents(submit);
  filterEvents();

  search(storageKey("channels"));

});

"use strict";

//local imports

const { buttonEvents, submitEvents } = require("./scripts/event-handlers");
const { getOutput, getStream, parseChannel, parseStream } = require("./scripts/view-logic");

//global imports

const { checkInput } = require("check-input");
const { animate, getJSON, listen, storageKey } = require("utilities");

//app logic

const search = (channels = "ESL_SC2, OgamingSC2, RobotCaleb, brunofin, comster404, cretetion, freecodecamp, habathcx, noobs2ninjas, storbeck") => {

  storageKey("channels", channels);

  $(".js-submit-input").val(channels);
  $(".js-render-output").empty();

  for (const e of channels.split(", ")) {

    const id = e.toLowerCase();

    getOutput(id, e);

    getJSON(`/twitch-viewer/channels?channel=${e}`)
      .then(parseChannel(id))
      .then(getStream(id))
      .then(parseStream(id));

  }

};

const submit = () => {

  let channels = $(".js-submit-input").val();

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

  const $output = $(".js-render-output");

  animate($output, { opacity: 0 }, () => {
    search(channels);
    animate($output, { opacity: 1 });
  });

};

//initialize app

listen(document, "DOMContentLoaded", () => {

  checkInput();

  submitEvents(submit);
  buttonEvents();

  search(storageKey("channels"));

});

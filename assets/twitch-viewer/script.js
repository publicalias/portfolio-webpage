"use strict";

//local imports

const { buttonEvents, submitEvents } = require("./scripts/event-handlers");
const { getOutput, getStream, parseChannel, parseStream } = require("./scripts/view-logic");

//global imports

const { checkInput } = require("check-input");
const { getJSON, storageKey } = require("utilities");

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

  if (!(/^(\w{4,25},\s)*\w{4,25}$/).test(channels)) {
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

  $output.fadeOut(() => {
    search(channels);
    $output.fadeIn();
  });

};

//initialize app

$(() => {

  checkInput();

  submitEvents(submit);
  buttonEvents();

  search(storageKey("channels"));

});

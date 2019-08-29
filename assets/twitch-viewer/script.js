"use strict";

//local imports

const { filterEvents, submitEvents } = require("./scripts/client/event-handlers");
const { renderOutput } = require("./scripts/client/view-logic");

//global imports

const { checkInput, storageKey } = require("all/client-utils");
const { select } = require("all/dom-api");

//app logic

const search = async (channels = "brunofin, comster404, cretetion, esl_sc2, freecodecamp, habathcx, noobs2ninjas, ogamingsc2, robotcaleb, storbeck") => {

  const list = await renderOutput(channels.split(", "));

  storageKey("channels", channels);

  select(".js-submit-input").value = list.map((e) => e.name).join(", ");

};

const submit = () => {

  let channels = select(".js-submit-input").value;

  if (!(/^(\w{4,25},\s)*\w{4,25}$/u).test(channels)) {
    return;
  }

  channels = channels.toLowerCase()
    .split(", ")
    .filter((e, i, arr) => arr.indexOf(e) === i)
    .sort()
    .join(", ");

  if (channels === storageKey("channels")) {
    return;
  }

  const DOMOutput = select(".js-render-output");

  DOMOutput.animate({ opacity: 0 }, async () => {

    await search(channels);

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

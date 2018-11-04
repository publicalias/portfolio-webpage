"use strict";

//local imports

const { renderResults, toggleOutline } = require("./scripts/view-logic");

//global imports

const { checkInput } = require("check-input");
const { select } = require("dom-api");
const { modalEvents, toggleModal } = require("modal");
const { submitKeys } = require("submit-keys");
const { getJSON, wrapFn } = require("utilities");

//app logic

const search = () => {

  const $input = $(".js-submit-input");

  const term = $input.val().trim();

  if (!term) {
    return;
  }

  const url = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${encodeURIComponent(term)}`;

  $input.val("");

  getJSON(url).then(renderResults);

};

//initialize app

select(document).on("DOMContentLoaded", () => {

  checkInput();

  select(".js-submit-input, .js-submit-button").on("blur focus", toggleOutline);
  select(".js-submit-button").on("click", search);

  select(window).on("keydown", submitKeys());

  modalEvents();

  select(".js-render-output").on("click", ".js-close-modal", wrapFn(toggleModal));

});

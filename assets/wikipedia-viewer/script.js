"use strict";

//local imports

const { renderResults, toggleOutline } = require("./scripts/view-logic");

//global imports

const { checkInput, getJSON, submitKeys } = require("client-utils");
const { modalEvents, toggleModal } = require("components/modal");
const { select } = require("dom-api");

//app logic

const search = async () => {

  const DOMInput = select(".js-submit-input");

  const term = DOMInput.value.trim();

  if (!term) {
    return;
  }

  DOMInput.value = "";

  const res = await getJSON(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${encodeURIComponent(term)}`);

  renderResults(res);

};

//initialize app

select(document).on("DOMContentLoaded", () => {

  checkInput();

  select(".js-get-outline").on("blur focus", toggleOutline);

  select(".js-submit-button").on("click", search);

  submitKeys();

  select(".js-render-output").on("click", ".js-close-modal", () => {
    toggleModal();
  });

  modalEvents();

});

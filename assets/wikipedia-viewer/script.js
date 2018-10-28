"use strict";

//local imports

const { renderResults, toggleOutline } = require("./scripts/view-logic");

//global imports

const { checkInput } = require("check-input");
const { listen } = require("dom-utils");
const { modalEvents, toggleModal } = require("modal");
const { submitKeys } = require("submit-keys");
const { getJSON } = require("utilities");

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

const closeModal = (parent) => (event) => {

  const path = event.composedPath();

  for (let i = 0; i < path.indexOf(parent); i++) {
    if (path[i].classList.contains("js-close-modal")) {

      toggleModal();

      return;

    }
  }

};

//initialize app

listen(document, "DOMContentLoaded", () => {

  const DOMRender = document.querySelector(".js-render-output");

  checkInput();

  listen(".js-submit-input, .js-submit-button", "blur focus", toggleOutline);
  listen(window, "keydown", submitKeys());
  listen(".js-submit-button", "click", search);

  modalEvents();
  listen(DOMRender, "click", closeModal(DOMRender));

});

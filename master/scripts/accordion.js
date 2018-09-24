"use strict";

//global imports

const { smoothScroll, storageKey } = require("utilities");

//close panel

const closePanel = () => {

  $(".js-expand-panel.is-open")
    .removeClass("is-open")
    .slideUp();

  storageKey("panel", "", true);

};

//toggle panel

const handleScroll = (id, padding, $open) => {

  const thisOffsetTop = $(`.js-toggle-panel-${id}`).offset().top;
  const openOffsetTop = $open.length && $open.offset().top < thisOffsetTop ? $open.outerHeight() : 0;

  const scrollTop = thisOffsetTop - openOffsetTop - padding;

  smoothScroll(scrollTop);

};

const togglePanel = (id, padding) => {

  const $this = $(`.js-expand-panel-${id}`);
  const $open = $(".js-expand-panel.is-open");

  const shouldOpen = !$this.hasClass("is-open");

  closePanel();

  if (shouldOpen) {

    $this.addClass("is-open").slideDown();

    storageKey("panel", id, true);

  }

  handleScroll(id, padding, $open);

};

//init panel

const initPanel = () => {

  const id = storageKey("panel", null, true);

  $(`.js-expand-panel-${id}`)
    .addClass("is-open")
    .css("display", "block");

};

//exports

module.exports = {
  closePanel,
  initPanel,
  togglePanel
};

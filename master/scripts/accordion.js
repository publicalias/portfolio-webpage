"use strict";

//global imports

const { animate, smoothScroll } = require("dom-utils");
const { storageKey } = require("utilities");

//close panel

const closePanel = () => {

  const $open = $(".js-expand-panel.is-open");

  animate($open, { height: 0 }, () => {
    $open.removeClass("is-open").css({ height: "auto" });
  });

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

    const h = $this.addClass("is-open").outerHeight();

    animate($this.outerHeight(0), { height: h }, () => {
      $this.css({ height: "auto" });
    });

    storageKey("panel", id, true);

  }

  handleScroll(id, padding, $open);

};

//init panel

const initPanel = () => {

  const id = storageKey("panel", null, true);

  $(`.js-expand-panel-${id}`).addClass("is-open");

};

//exports

module.exports = {
  closePanel,
  initPanel,
  togglePanel
};

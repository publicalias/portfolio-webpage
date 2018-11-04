"use strict";

//global imports

const { select } = require("dom-api");
const { storageKey } = require("utilities");

//close panel

const closePanel = () => {

  const DOMOpen = select(".js-expand-panel.is-open");

  if (!DOMOpen) {
    return;
  }

  DOMOpen.animate({ height: 0 }, () => {
    DOMOpen.class("is-open", true, false).css({ height: "auto" });
  });

  storageKey("panel", "", true);

};

//toggle panel

const handleScroll = (id, padding, $open) => {

  const thisOffsetTop = $(`.js-toggle-panel-${id}`).offset().top;
  const openOffsetTop = $open.length && $open.offset().top < thisOffsetTop ? $open.outerHeight() : 0;

  const scrollTop = thisOffsetTop - openOffsetTop - padding;

  select(document.scrollingElement).animate({ scrollTop });

};

const togglePanel = (id, padding) => {

  const DOMThis = select(`.js-expand-panel-${id}`);

  const $open = $(".js-expand-panel.is-open");

  const shouldOpen = !DOMThis.class("is-open");

  closePanel();

  if (shouldOpen) {

    const h = DOMThis.class("is-open", true, true).rect().height;

    DOMThis.rect({ height: 0 }).animate({ height: h }, () => {
      DOMThis.css({ height: "auto" });
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

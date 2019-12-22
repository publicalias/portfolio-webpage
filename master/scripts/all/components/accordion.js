"use strict";

//global imports

const { storageKey } = require("all/client-utils");
const { select } = require("all/dom-api");

//close panel

const closePanel = () => {

  const DOMOpen = select(".js-expand-panel.is-open");

  if (!DOMOpen.first) {
    return;
  }

  DOMOpen.animate({ height: 0 }, () => {
    DOMOpen.class("is-open", true).css({ height: "auto" });
  });

  storageKey("panel", "", true);

};

//toggle panel

const handleScroll = (id, padding, DOMOpen) => {

  const thisOffsetTop = select(`.js-toggle-panel-${id}`).rect().top;
  const belowOpen = DOMOpen.first && DOMOpen.rect().top < thisOffsetTop;
  const openHeight = belowOpen ? DOMOpen.rect().height : 0;

  const scrollTop = thisOffsetTop - openHeight - padding;

  select(document.scrollingElement).animate({ scrollTop });

};

const togglePanel = (id, padding) => {

  const DOMThis = select(`.js-expand-panel-${id}`);
  const DOMOpen = select(".js-expand-panel.is-open");

  const shouldOpen = !DOMThis.class("is-open");

  closePanel();

  if (shouldOpen) {

    const h = DOMThis.class("is-open", true).rect().height;

    DOMThis.rect({ height: 0 }).animate({ height: h }, () => {
      DOMThis.css({ height: "auto" });
    });

    storageKey("panel", id, true);

  }

  handleScroll(id, padding, DOMOpen);

};

//init panel

const initPanel = () => {

  const id = storageKey("panel", null, true);

  select(`.js-expand-panel-${id}`).class("is-open", true, true);

};

//exports

module.exports = {
  closePanel,
  initPanel,
  togglePanel
};

"use strict";

//global imports

const { select } = require("dom-api");
const { wrapFn } = require("utilities");

//toggle modal

const toggleState = (bool = false, DOMHide, DOMShow) => {
  DOMHide.class("is-open", true, bool);
  DOMShow.class("is-open", true, bool);
};

const toggleModal = (bool) => {

  const DOMFade = select(".js-fade-modal");
  const DOMHide = select(".js-hide-modal");
  const DOMShow = select(".js-show-modal");

  if (bool) {
    DOMFade.class("is-open", true, true).animate({ opacity: 1 });
    DOMHide.css({
      backgroundSize: DOMHide.css().width,
      width: DOMHide.css().width
    });
  } else {
    DOMFade.animate({ opacity: 0 }, () => {
      DOMFade.class("is-open", true, false);
    });
    DOMHide.css({
      backgroundSize: "100%",
      width: "auto"
    });
    toggleState(bool, DOMHide, DOMShow);
  }

  DOMShow.animate({ top: bool ? 0 : "100vh" }, () => {
    if (bool) {
      toggleState(bool, DOMHide, DOMShow);
      DOMShow.scrollTop = 0;
    }
  });

};

//modal events

const modalEvents = () => {
  select(window)
    .on("resize", wrapFn(toggleModal))
    .on("keydown", (event) => {
      if (event.key === "Escape") {
        toggleModal();
      }
    });
};

//exports

module.exports = {
  modalEvents,
  toggleModal
};

"use strict";

//global imports

const { select } = require("all/dom-api");
const { handleTeardown, hookEvent } = require("all/react-utils");

//toggle modal

const toggleState = (DOMHide, DOMShow, bool = false) => {
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
    toggleState(DOMHide, DOMShow, bool);
  }

  DOMShow.animate({ top: bool ? 0 : "100vh" }, () => {
    if (bool) {
      toggleState(DOMHide, DOMShow, bool);
      DOMShow.scrollTop = 0;
    }
  });

};

//modal events

const modalEvents = () => handleTeardown([

  hookEvent(select(window), "resize", () => {
    toggleModal();
  }),

  hookEvent(select(window), "keydown", (event) => {
    if (event.key === "Escape") {
      toggleModal();
    }
  })

]);

//exports

module.exports = {
  modalEvents,
  toggleModal
};

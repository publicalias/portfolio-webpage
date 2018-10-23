"use strict";

//global imports

const { animate, wrapFn } = require("utilities");

//toggle modal

const toggleState = (bool = false, $hide, $show) => {
  $hide.toggleClass("is-open", bool);
  $show.toggleClass("is-open", bool);
};

const toggleModal = (bool) => {

  const $fade = $(".js-fade-modal");
  const $hide = $(".js-hide-modal");
  const $show = $(".js-show-modal");

  if (bool) {
    animate($fade.addClass("is-open"), { opacity: 1 });
    $hide.css({
      "background-size": $hide.css("width"),
      "width": $hide.css("width")
    });
  } else {
    animate($fade, { opacity: 0 }, () => {
      $fade.removeClass("is-open");
    });
    $hide.css({
      "background-size": "100%",
      "width": "auto"
    });
    toggleState(bool, $hide, $show);
  }

  animate($show, { top: bool ? 0 : "100vh" }, () => {
    if (bool) {
      toggleState(bool, $hide, $show);
      $show.scrollTop(0);
    }
  });

};

//modal events

const modalEvents = () => {

  $(window).keydown((event) => {
    if (event.key === "Escape") {
      toggleModal();
    }
  });

  $(window).resize(wrapFn(toggleModal, false));

};

//exports

module.exports = {
  modalEvents,
  toggleModal
};

"use strict";

//global imports

const { wrapFn } = require("utilities");

//toggle modal

const toggleState = (bool = false, $hide, $show) => {
  $hide.toggleClass("is-hidden", bool);
  $show.toggleClass("is-open", bool);
};

const toggleModal = (bool) => {

  const $fade = $(".js-fade-modal");
  const $hide = $(".js-hide-modal");
  const $show = $(".js-show-modal");

  if (bool) {
    $fade.fadeIn();
    $hide.css({
      "background-size": $hide.css("width"),
      "width": $hide.css("width")
    });
  } else {
    $fade.fadeOut();
    $hide.css({
      "background-size": "100%",
      "width": "auto"
    });
    toggleState(bool, $hide, $show);
  }

  $show.animate({ top: bool ? 0 : "100vh" }, () => {
    if (bool) {
      toggleState(bool, $hide, $show);
      $show.scrollTop(0);
    }
  });

};

//modal events

const modalEvents = () => {

  const $show = $(".js-show-modal");

  $show.click((event) => {
    if (event.target === $show[0]) {
      toggleModal();
    }
  });

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

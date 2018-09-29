"use strict";

//check input

const checkInput = () => {

  const $check = $(".js-check-input");

  let timer;
  let block = false;

  const isTouch = () => {

    clearTimeout(timer);

    block = true;

    timer = setTimeout(() => {
      block = false;
    }, 1000);

    $check.removeClass("is-mouse").addClass("is-touch");

  };

  const isMouse = () => {

    if (block) {
      return;
    }

    $check.addClass("is-mouse").removeClass("is-touch");

  };

  $check.on("touchstart", isTouch).on("mouseover", isMouse);

};

//exports

module.exports = { checkInput };

"use strict";

//update view

const updateView = (that, id) => {

  $(".js-edit-val").text(that.val);
  $(".js-edit-chain").text(that.chain);

  if (id) {
    $(`.js-click-${id}`).focus();
  }

};

//exports

module.exports = { updateView };

"use strict";

//global imports

const { select } = require("dom-api");

//update view

const updateView = (that, id) => {

  select(".js-edit-val").text(that.val);
  select(".js-edit-chain").text(that.chain);

  if (id) {
    select(`.js-click-${id}`).focus();
  }

};

//exports

module.exports = { updateView };

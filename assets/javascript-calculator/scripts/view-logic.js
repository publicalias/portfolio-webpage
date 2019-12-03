"use strict";

//global imports

const { select } = require("all/dom-api");
const { delimit, toPrecision } = require("all/utilities");

//read output

const readOutput = () => select(".js-edit-val")
  .text()
  .replace(/,/g, "");

//update view

const updateView = (that, id, manual) => {

  const val = delimit(manual ? that.val : toPrecision(that.val, 14));
  const chain = that.chain.split(/(\s[+\-*/]\s*)/)
    .map((e) => /\d+/.test(e) ? toPrecision(e, 14) : e)
    .map(delimit)
    .join("");

  select(".js-edit-val").text(val);
  select(".js-edit-chain").text(chain);

  if (id) {
    select(`.js-click-${id}`).focus();
  }

};

//exports

module.exports = {
  readOutput,
  updateView
};

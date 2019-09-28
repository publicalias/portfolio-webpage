"use strict";

//global imports

const { select } = require("all/dom-api");
const { toPrecision } = require("all/utilities");

//read output

const readOutput = () => select(".js-edit-val")
  .text()
  .replace(/,/g, "");

//update view

const format = (n) => n.replace(/\d+/, (match) => {

  const x = match.split("");

  for (let i = x.length - 3; i > 0; i -= 3) {
    x.splice(i, 0, ",");
  }

  return x.join("");

});

const updateView = (that, id, manual) => {

  const val = format(manual ? that.val : toPrecision(that.val, 14));
  const chain = that.chain.split(/(\s[+\-*/]\s*)/)
    .map((e) => /\d+/.test(e) ? toPrecision(e, 14) : e)
    .map(format)
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

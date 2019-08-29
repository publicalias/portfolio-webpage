"use strict";

//global imports

const { select } = require("all/dom-api");

//item is in view

const itemIsInView = (id, addTop = 0, addBottom = 0) => {

  const DOMRect = select(id).rect();

  const windowTop = window.scrollY;
  const windowBottom = windowTop + window.innerHeight;

  const itemTop = DOMRect.top;
  const itemBottom = itemTop + DOMRect.height;

  const notAbove = windowBottom - addBottom > itemTop;
  const notBelow = windowTop + addTop < itemBottom;

  return notAbove && notBelow;

};

//exports

module.exports = { itemIsInView };

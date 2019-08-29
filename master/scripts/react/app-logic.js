"use strict";

//global imports

const { select } = require("all/dom-api");

//array 2d

const array2D = (height, width, setVal) => {

  const arr = [];

  for (let i = 0; i < height; i++) {

    arr.push([]);

    for (let j = 0; j < width; j++) {
      arr[i].push(setVal(i, j));
    }

  }

  return arr;

};

//array 2d each

const array2DEach = (arr, fn) => {
  arr.forEach((e, i) => {
    e.forEach((f, j) => {
      fn(e, i, f, j);
    });
  });
};

//mouse yx

const mouseYX = (event, grid) => {

  const { height, width, top, left } = select(".js-ref-canvas").rect();

  const mt = event.clientY - top + window.scrollY;
  const ml = event.clientX - left + window.scrollX;

  const mh = height / grid.length;
  const mw = width / grid[0].length;

  const y = Math.floor(mt / mh);
  const x = Math.floor(ml / mw);

  return [y, x];

};

//exports

module.exports = {
  array2D,
  array2DEach,
  mouseYX
};

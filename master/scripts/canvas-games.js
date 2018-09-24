"use strict";

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

const mouseYX = (event, arr) => {

  const $canvas = $(".js-ref-canvas");
  const $scroll = $(document.scrollingElement);

  const top = event.clientY - $canvas.offset().top + $scroll.scrollTop();
  const left = event.clientX - $canvas.offset().left + $scroll.scrollLeft();

  const height = $canvas.outerHeight() / arr.length;
  const width = $canvas.outerWidth() / arr[0].length;

  const y = Math.floor(top / height);
  const x = Math.floor(left / width);

  return [y, x];

};

//exports

module.exports = {
  array2D,
  array2DEach,
  mouseYX
};

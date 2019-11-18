"use strict";

//global imports

const { select } = require("all/dom-api");

//update board

const updateBoard = (board) => {
  board.forEach((e, i) => {

    const [text, bool] = ((data) => data[e])({
      "1": ["X", false],
      "0": ["&nbsp;", true],
      "-1": ["O", false]
    });

    select(`.js-click-cell-${i}`)
      .html(text)
      .class("is-empty", true, bool);

  });
};

//update count

const updateCount = (rounds, winsX, winsO) => {
  select(".js-edit-rounds").text(rounds);
  select(".js-edit-wins-x").text(winsX);
  select(".js-edit-wins-o").text(winsO);
};

//exports

module.exports = {
  updateBoard,
  updateCount
};

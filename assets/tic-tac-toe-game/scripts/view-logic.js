"use strict";

//global imports

const { select } = require("all/dom-api");

//update board

const updateBoard = (board) => {
  for (let i = 0; i < board.length; i++) {

    const DOMCell = select(`.js-click-cell-${i}`);

    switch (board[i]) {
      case 1:
        DOMCell.text("X");
        break;
      case 0:
        DOMCell.html("&nbsp;");
        break;
      case -1:
        DOMCell.text("O");
    }

    DOMCell.class("is-empty", true, board[i] === 0);

  }
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

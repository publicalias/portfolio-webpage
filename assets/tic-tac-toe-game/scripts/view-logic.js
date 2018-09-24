"use strict";

//update board

const updateBoard = (board) => {
  for (let i = 0; i < board.length; i++) {

    const $id = $(`.js-click-cell-${i}`);

    switch (board[i]) {
      case 1:
        $id.text("X").removeClass("is-empty");
        break;
      case 0:
        $id.html("&nbsp;").addClass("is-empty");
        break;
      case -1:
        $id.text("O").removeClass("is-empty");
    }

  }
};

//update count

const updateCount = (rounds, winsX, winsO) => {
  $(".js-edit-rounds").text(rounds);
  $(".js-edit-wins-x").text(winsX);
  $(".js-edit-wins-o").text(winsO);
};

//exports

module.exports = {
  updateBoard,
  updateCount
};

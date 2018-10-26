"use strict";

//local imports

const { bestMove, checkBoard, evalMoves, initTree } = require("./scripts/app-logic");
const { clickEvents } = require("./scripts/event-handlers.js");
const { updateBoard, updateCount } = require("./scripts/view-logic");

//global imports

const { modalEvents, toggleModal } = require("modal");
const { bindObject, listen } = require("utilities");

//app logic

const app = {

  board: null,
  single: null,
  player: null,
  turn: null,

  rounds: null,
  winsX: null,
  winsO: null,

  //player move

  move(val) {
    return () => {

      if (this.board[val] !== 0) {
        return;
      }

      if (this.single) {
        if (this.turn) {
          this.fillCell(val, this.player);
        }
      } else {
        this.fillCell(val, this.turn ? 1 : -1);
      }

    };
  },

  //computer move

  play() {

    if (this.turn) {
      return;
    }

    const params = {
      board: this.board,
      player: this.player,
      actor: this.player === 1 ? -1 : 1,
      moves: [],
      lastTree: [],
      nextTree: [],
      win: 100,
      lose: -100,
      turns: 0
    };

    const { actor } = params;

    initTree(params);
    evalMoves(params);

    this.fillCell(bestMove(params), actor);

  },

  //fill cell

  fillCell(cell, actor) {

    this.board[cell] = actor;
    this.turn = !this.turn;

    updateBoard(this.board);

    this.handleWin();

  },

  //handle win

  handleWin() {

    const win = checkBoard(this.board);

    if (win || !this.board.includes(0)) {

      if (win === 1) {
        this.winsX++;
      } else if (win === -1) {
        this.winsO++;
      }

      setTimeout(this.nextRound, 1000);

    } else if (this.single && !this.turn) {
      setTimeout(this.play, 1000);
    }

  },

  //next round

  nextRound() {

    this.board = Array(9).fill(0);
    this.rounds++;

    updateBoard(this.board);
    updateCount(this.rounds, this.winsX, this.winsO);

    this.turn = this.single ? this.player === 1 : true;

    if (!this.turn) {
      this.play();
    }

  },

  //restart game

  restart() {

    this.board = Array(9).fill(0);
    this.single = true;
    this.player = 1;
    this.turn = true;

    this.rounds = 0;
    this.winsX = 0;
    this.winsO = 0;

    updateBoard(this.board);
    updateCount(0, 0, 0);

  },

  //settings

  setSingle(bool) {
    this.single = bool;
  },

  setPlayer(val) {
    if (val === -1) {
      this.player = val;
      this.turn = false;
      setTimeout(this.play, 1000);
    }
  }

};

//initialize app

bindObject(app);

listen(document, "DOMContentLoaded", () => {

  clickEvents(app);
  modalEvents();

  app.restart();

  toggleModal(true);

});

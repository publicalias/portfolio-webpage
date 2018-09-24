"use strict";

//global imports

const { rngInt } = require("utilities");

//utilities

const fillTree = (params, lastBoard, root) => {

  const { actor, nextTree } = params;

  for (let i = 0; i < 9; i++) {

    if (lastBoard[i] !== 0) {
      continue;
    }

    const nextBoard = lastBoard.slice();

    nextBoard[i] = actor;

    nextTree.push({
      root: root === undefined ? i : root,
      board: nextBoard
    });

  }

};

//best move

const bestMove = (params) => {

  const { moves } = params;

  const best = moves.sort((a, b) => b.score - a.score).filter((e, i, arr) => e.score === arr[0].score);

  return best[rngInt(0, best.length)].root;

};

//check board

const checkBoard = (board) => {

  const win = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

  ];

  for (let i = 0; i < 8; i++) {

    let sum = 0;

    for (let j = 0; j < 3; j++) {
      sum += board[win[i][j]];
    }

    if (sum === 3 || sum === -3) {
      return sum / 3;
    }

  }

};

//eval moves

const shiftTrees = (params) => {

  const { nextTree } = params;

  params.lastTree = nextTree;
  params.nextTree = [];

};

const updateRoot = (params, leaf, winner) => {

  const { player, moves, win, lose } = params;

  const root = moves.find((e) => e.root === leaf.root);

  root.score += player === winner ? lose : win;

};

const evalLastTree = (params) => {

  const { lastTree } = params;

  for (const e of lastTree) {

    const winner = checkBoard(e.board);

    if (winner) {
      updateRoot(params, e, winner);
    } else if (e.board.includes(0)) {
      fillTree(params, e.board, e.root);
    }

  }

};

const updateTurns = (params) => {

  params.turns++;

  const { turns } = params;

  params[turns % 2 ? "win" : "lose"] /= 10;

};

const evalMoves = (params) => {

  const { actor } = params;

  params.actor = actor === 1 ? -1 : 1;

  shiftTrees(params);
  evalLastTree(params);
  updateTurns(params);

  const { nextTree, turns } = params;

  if (nextTree.length && turns < 5) {
    evalMoves(params);
  }

};

//init tree

const initTree = (params) => {

  const { board, moves } = params;

  fillTree(params, board);

  for (let i = 0; i < board.length; i++) {

    if (board[i] !== 0) {
      continue;
    }

    moves.push({
      root: i,
      score: 0
    });

  }

};

//exports

module.exports = {
  bestMove,
  checkBoard,
  evalMoves,
  initTree
};

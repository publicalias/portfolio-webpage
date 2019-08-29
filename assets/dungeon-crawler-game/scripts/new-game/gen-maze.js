"use strict";

//local imports

const { checkIndex, nearbyCells } = require("../app-logic");

//global imports

const { rngInt } = require("all/utilities");
const { array2D } = require("react/app-logic");

//gen maze

const mazeParams = () => {

  const walls = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80];
  const cells = [];
  const model = array2D(8, 10, () => false);

  for (let i = 0; i < walls.length - 1; i++) {

    cells.push([]);

    for (let j = walls[i] + 1; j < walls[i + 1]; j++) {
      cells[i].push(j);
    }

  }

  return {
    walls, //walls
    cells, //space between walls
    stack: [], //visited cells
    model //map of visited cells
  };

};

const findWall = (maze, [cy, cx], [ny, nx]) => {

  const { walls, cells } = maze;

  //static index

  const wy = cy === ny ? null : walls[Math.max(cy, ny)];
  const wx = cx === nx ? null : walls[Math.max(cx, nx)];

  //index range

  const range = cells[wy ? cx : cy];

  //wall segment

  return range.map((e) => [wy || e, wx || e]);

};

const clearWall = (params, maze, cell, next) => {

  const { levels, depth } = params;

  const wall = findWall(maze, cell, next);

  for (const [y, x] of wall) {
    levels[depth][y][x] = 0;
  }

};

const unvisitedCells = (maze, next) => {

  const { model } = maze;

  return nearbyCells(next).filter(([y, x]) => checkIndex(model, [y, x]) === false);

};

const backtrack = (params, maze, [y, x]) => {

  const { stack, model } = maze;

  model[y][x] = true;

  const unvisited = unvisitedCells(maze, [y, x]);

  if (unvisited.length) {

    const next = unvisited[rngInt(0, unvisited.length)];

    stack.push([y, x]);
    clearWall(params, maze, [y, x], next);
    backtrack(params, maze, next);

  } else if (stack.length) {
    backtrack(params, maze, stack.pop());
  }

};

const genMaze = (params) => {

  const { levels, mapped, depth } = params;

  const maze = mazeParams();

  const { walls } = maze;

  levels[depth] = array2D(65, 81, (i, j) => walls.includes(i) || walls.includes(j) ? 1 : 0);
  mapped[depth] = array2D(65, 81, () => false);

  backtrack(params, maze, [0, 0]);

};

//exports

module.exports = { genMaze };

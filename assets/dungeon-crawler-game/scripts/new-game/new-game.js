"use strict";

//local imports

const { genEnemies } = require("./gen-enemies");
const { genMaze } = require("./gen-maze");
const { populateLevel } = require("./populate-level");

//new game

const createArraySet = (items) => {

  const set = {};

  for (let i = 1; i <= items; i++) {
    set[i] = [];
  }

  return set;

};

const newGameParams = () => ({
  levels: createArraySet(3),
  mapped: createArraySet(3),
  ladders: createArraySet(2),
  enemies: createArraySet(3),
  depth: null,
  enemyIndexes: null,
  bossIndex: null,
  charIndex: null
});

const newGameState = (params, props) => {

  const { levels, mapped, enemies, charIndex } = params;
  const { hoverInfo, events } = props;

  const hoverProx = hoverInfo.enemyProx(levels[1], enemies[1], charIndex, false, 0);
  const hoverBase = hoverInfo.base(enemies, 1);

  return {

    //metadata

    start: false,

    //level

    levels,
    mapped,

    thisLevel: 1,

    //character

    char: {

      stats: {
        id: "9-1-0",
        boss: false,
        level: 1,
        exp: 0,
        hp: 100,
        res: 10,
        dmg: 15,
        index: charIndex
      },

      items: {
        lockpicks: 2,
        maps: {
          1: false,
          2: false,
          3: false
        },
        weapon: 0,
        weapons: {
          0: true,
          1: false,
          2: false,
          3: false
        },
        abilities: {
          1: false,
          2: false,
          3: false
        },
        hpPots: 0,
        dmgPots: 0
      },

      active: {
        sneak: false,
        sneakCD: 0,
        bsMult: 0,
        dmgMult: 0,
        danger: false,
        concussed: 0
      },

      debuff: {
        drunk: 0,
        stun: 0,
        disarm: 0,
        bleed: 0
      }

    },

    //enemies

    enemies,

    //hints

    hintLevel: 1,
    nextIndex: 0,

    //story

    timeouts: {
      one: 5,
      two: 0,
      three: 0,
      win: 0,
      death: 0
    },

    win: false,
    bonus: false,

    //display

    hoverText: hoverProx || hoverBase,
    eventLog: [events.start]

  };

};

const newGame = (props) => {

  const params = newGameParams();

  const { levels } = params;

  for (const p in levels) {

    params.depth = Number(p);

    genMaze(params);
    populateLevel(params);
    genEnemies(params);

  }

  return newGameState(params, props);

};

//exports

module.exports = { newGame };

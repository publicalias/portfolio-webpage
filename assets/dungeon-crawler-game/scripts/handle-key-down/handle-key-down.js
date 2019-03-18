"use strict";

//local imports

const { getCounts, scramble } = require("../app-logic");
const { enemyActions } = require("./enemy-actions/enemy-actions");
const { playerActions } = require("./player-actions/player-actions");
const { playerCombat } = require("./player-combat/player-combat");
const { statusEffects } = require("./status-effects");
const { timeoutHandler } = require("./timeout-handler");

//global imports

const { deepCopy } = require("utilities");

//handle gameplay

const setHoverText = (params) => {

  const { merge, char, thisLevel, level, enemies, hoverInfo, hoverText, playerTarget } = params;

  const hoverTarget = hoverInfo.enemyInfo(playerTarget, char.active.bsMult);
  const hoverProx = hoverInfo.enemyProx(
    level,
    enemies,
    char.stats.index,
    char.items.maps[thisLevel],
    char.active.bsMult
  );
  const hoverBase = hoverInfo.base(merge.enemies, thisLevel);

  merge.hoverText = hoverTarget || hoverText || hoverProx || hoverBase;

};

const gameplayEvents = (params, action) => {

  const { char } = params;

  if (!char.debuff.stun) {
    action(params);
    playerCombat(params);
  }

  enemyActions(params);
  statusEffects(params);
  setHoverText(params);

};

const handleGameplay = (params, event) => {

  const { merge } = params;

  const action = playerActions[`${event.key}Key`];

  if (!action) {
    return;
  }

  timeoutHandler(params);

  if (merge.win) {
    return;
  }

  gameplayEvents(params, action);

};

//keydown params

const keyDownParams = (state, props) => {

  const merge = deepCopy(state);

  const { levels, thisLevel, char, enemies, eventLog } = merge;
  const { hoverInfo, events } = props;

  return {

    //updated state

    merge,

    //shorthand props

    char,
    thisLevel,
    level: levels[thisLevel],
    enemies: enemies[thisLevel],
    events,
    hoverInfo,

    //local state

    hoverText: null,
    playerTarget: null,

    //utilities

    getCounts() {
      return getCounts(enemies);
    },

    updateLog(str) {

      const event = char.active.concussed < 5 ? str : scramble(str);

      eventLog.unshift(event);

    }

  };

};

//exports

module.exports = {
  handleGameplay,
  keyDownParams
};

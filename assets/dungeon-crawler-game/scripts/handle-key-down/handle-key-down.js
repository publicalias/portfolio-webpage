"use strict";

//local imports

const { getCounts, scramble } = require("../app-logic");
const { enemyActions } = require("./enemy-actions/enemy-actions");
const { playerActions } = require("./player-actions/player-actions");
const { playerCombat } = require("./player-combat/player-combat");
const { statusEffects } = require("./status-effects");
const { timeoutHandler } = require("./timeout-handler");

//handle gameplay

const setHoverText = (params) => {

  const { state, char, thisLevel, level, enemies, hoverInfo, hoverText, playerTarget } = params;

  const hoverTarget = hoverInfo.enemyInfo(playerTarget, char.active.bsMult);
  const hoverProx = hoverInfo.enemyProx(
    level,
    enemies,
    char.stats.index,
    char.items.maps[thisLevel],
    char.active.bsMult
  );
  const hoverBase = hoverInfo.base(state.enemies, thisLevel);

  state.hoverText = hoverTarget || hoverText || hoverProx || hoverBase;

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

  const { state } = params;

  const action = playerActions[`${event.key}Key`];

  if (!action) {
    return;
  }

  timeoutHandler(params);

  if (state.win) {
    return;
  }

  gameplayEvents(params, action);

};

//keydown params

const keyDownParams = (state, props) => {

  const thisLevel = state.thisLevel;

  return {

    //updated state

    state,

    //shorthand props

    char: state.char,
    thisLevel,
    level: state.levels[thisLevel],
    enemies: state.enemies[thisLevel],
    events: props.events,
    hoverInfo: props.hoverInfo,

    //local state

    hoverText: null,
    playerTarget: null,

    //utilities

    getCounts() {
      return getCounts(state.enemies);
    },

    updateLog(str) {

      const event = state.char.active.concussed < 5 ? str : scramble(str);

      state.eventLog.unshift(event);

    }

  };

};

//exports

module.exports = {
  handleGameplay,
  keyDownParams
};

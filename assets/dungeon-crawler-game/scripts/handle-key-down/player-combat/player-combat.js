"use strict";

//local imports

const { baseDmg } = require("../../app-logic");
const { handleAttack } = require("./handle-attack/handle-attack");
const { handleBetrayal } = require("./handle-betrayal");
const { handleKill } = require("./handle-kill/handle-kill");

//player combat

const playerCombat = (params) => {

  const { char, playerTarget } = params;

  if (!playerTarget) {
    return;
  }

  const action = {
    target: playerTarget,
    dmg: baseDmg(char.stats.dmg),
    exec: false,
    eff: false,
    succ: false
  };

  handleBetrayal(params, action);
  handleAttack(params, action);
  handleKill(params, action);

};

//exports

module.exports = { playerCombat };

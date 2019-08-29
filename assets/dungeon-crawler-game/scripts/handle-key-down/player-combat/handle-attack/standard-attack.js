"use strict";

//global imports

const { chance } = require("all/utilities");

//standard attack

const applyEffect = (action, type, timer) => {

  const { target } = action;

  if (target.debuff[type]) {
    action.eff = false;
  } else if (chance(100 - target.stats.res) || target.debuff.stun) {
    target.debuff[type] = timer;
    action.succ = true;
  }

};

const clubEffect = (action) => {
  applyEffect(action, "stun", 3);
};

const swordEffect = (action) => {

  applyEffect(action, "disarm", 5);

  const { target, succ } = action;

  if (succ) {
    target.stats.dmg /= 2;
  }

};

const daggerEffect = (action) => {
  applyEffect(action, "bleed", 5);
};

const weaponEffects = (params, action) => {

  //apply effect

  const { char, events, updateLog } = params;

  const effect = [clubEffect, swordEffect, daggerEffect];
  const weapon = char.items.weapon;

  effect[weapon - 1](action);

  //check success

  const { eff, succ } = action;

  if (eff) {
    updateLog(events.use.weapon(weapon, succ));
  }

};

const standardAttack = (params, action) => {

  const { target, exec, eff } = action;

  if (exec) {
    action.dmg = 100;
  } else {

    action.dmg *= (100 - target.stats.res) / 100;

    if (eff) {
      weaponEffects(params, action);
    }

  }

};

//exports

module.exports = { standardAttack };

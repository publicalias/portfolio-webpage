"use strict";

//local imports

const { addHostile, baseDmg, handleDeath, playerWins } = require("../../../app-logic");
const { handleNgPlus } = require("./handle-ng-plus");

//global imports

const { chance } = require("all/utilities");

//handle combat

const handleAttack = (actors) => {

  const { self, target } = actors;

  target.stats.hp = Math.max(target.stats.hp - baseDmg(self.stats.dmg, target.stats.res), 0);

};

const playerEffect = (params, actors) => {

  const { char, events, updateLog } = params;

  handleNgPlus(params, actors);

  if (char.stats.hp <= 20 && !char.active.danger) {
    char.active.danger = true;
    updateLog(events.danger);
  }

};

const playerEvents = (params, actors) => {

  const { char, events, updateLog } = params;

  if (char.items.abilities[2] && !char.debuff.stun && chance(25)) {

    updateLog(events.use.ability(2));

    return;

  }

  handleAttack(actors);

  if (char.stats.hp <= 0) {
    handleDeath(params);
  } else {
    playerEffect(params, actors);
  }

};

const handleCombat = (params, actors, val) => {

  const { getCounts } = params;
  const { self, target } = actors;

  if (val === 9) {

    playerEvents(params, actors);

    return;

  }

  handleAttack(actors);

  if (target.stats.hp > 0) {
    addHostile(self, target);
    handleNgPlus(params, actors);
  } else if (!getCounts().enemy) {
    playerWins(params, 0, 1);
  }

};

//exports

module.exports = { handleCombat };

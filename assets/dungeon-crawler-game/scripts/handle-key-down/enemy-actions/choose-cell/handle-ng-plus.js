"use strict";

//global imports

const { chance, storageKey } = require("utilities");

//handle ng plus

const hasNgEffect = (actors, type, min) => {

  const { self } = actors;

  const count = storageKey("ngPlus");

  const match = self.stats.type === type && count >= min;
  const armed = !self.debuff.disarm;

  return match && armed && chance(15);

};

const addNgEffect = (params, actors, type, timer) => {

  const { events, updateLog } = params;
  const { target } = actors;

  const effect = ["stun", "disarm", "bleed"][type - 1];

  if (target.debuff[effect]) {
    return;
  }

  const success = chance(100 - target.stats.res) || target.debuff.stun;

  if (success) {
    target.debuff[effect] = timer;
  }

  if (target.stats.id === "9-1-0") {
    updateLog(events.use.debuff(type, success));
  }

};

const handleDisarm = (params, actors) => {

  const { char, hoverInfo } = params;
  const { target } = actors;

  if (target.debuff.disarm === 5) {
    if (target.stats.id === "9-1-0") {
      char.items.weapon = 0;
      char.stats.dmg = char.stats.level * 5 + hoverInfo.weapon.dmg[0];
    } else {
      target.stats.dmg /= 2;
    }
  }

};

const handleNgPlus = (params, actors) => {
  if (hasNgEffect(actors, 0, 1)) {
    addNgEffect(params, actors, 3, 5);
  } else if (hasNgEffect(actors, 1, 2)) {
    addNgEffect(params, actors, 2, 5);
    handleDisarm(params, actors);
  } else if (hasNgEffect(actors, 2, 3)) {
    addNgEffect(params, actors, 1, 3);
  }
};

//exports

module.exports = { handleNgPlus };

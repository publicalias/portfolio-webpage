"use strict";

//local imports

const { addHostile } = require("../../../app-logic");
const { backstabAttack } = require("./backstab-attack");
const { specialChance } = require("./special-chance");
const { standardAttack } = require("./standard-attack");

//handle attack

const handleEffect = (params, action) => {

  const { char } = params;

  if (char.active.bsMult) {
    backstabAttack(params, action);
  } else {
    specialChance(params, action);
    standardAttack(params, action);
  }

};

const handlePotion = (params, action) => {

  const { char } = params;

  if (char.active.dmgMult) {
    action.dmg *= 2;
    char.active.dmgMult = 0;
  }

};

const handleDamage = (params, action) => {

  const { char } = params;
  const { target, dmg } = action;

  target.stats.hp = Math.max(target.stats.hp - dmg, 0);

  addHostile(char, target);

  char.active.sneak = false;

};

const handleAttack = (params, action) => {
  handleEffect(params, action);
  handlePotion(params, action);
  handleDamage(params, action);
};

//exports

module.exports = { handleAttack };

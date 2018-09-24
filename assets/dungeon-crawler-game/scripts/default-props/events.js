"use strict";

//local imports

const { enemyTypes, weapon } = require("./type-data");

//global imports

const { roundTo } = require("utilities");

//events

const events = {

  //story

  start: "Your silver tongue and gold purse bought you safe passage to an infamous rogue's den.",
  level: {
    1: "The local ruffians look restless.",
    2: "The brutes wear insignias that mark them as the boss's bodyguards.",
    3: "News of your incursion appears to have reached the boss's ears."
  },
  bonus: {
    1: "You killed the boss! Those who hear may surrender, but others will deny your claim.",
    2: "You loot a map and some potions from his pockets."
  },

  win(type, subtype) {

    const subtypes = ["dies by your hands", "dies by your ally's hands", "surrenders"];

    const types = [
      `Your last opponent ${subtypes[subtype]}. The den is yours.`,
      "You killed the boss, and those who remain dare not oppose you. The den is yours.",
      "Your great ambition has been realized, but none remain to do your bidding."
    ];

    return types[type];

  },

  //combat

  danger: "Your health is low!",
  died: "You died.",
  leveled: "You leveled up!",
  surrender: "Your opponent surrenders.",
  betray: "You betray your ally.",

  kill(enemyType, level, exp, exec, weaponType) {

    const enemy = enemyTypes[enemyType].toLowerCase();
    const expGain = exp ? ` +${roundTo(exp, 1)} EXP.` : "";

    const flourish = [
      `You snap the ${enemy}'s neck.`,
      `You smash the ${enemy}'s skull.`,
      `You run the ${enemy} through.`,
      `You slash the ${enemy}'s throat.`
    ];

    return `${exec ? flourish[weaponType] : `You killed a ${enemy} (Level ${level}).`}${expGain}`;

  },

  //world

  concussed: "You're going to give yourself brain damage.",

  pickUp: {

    weapon(level) {
      return `You stole someone's ${weapon.type[level].toLowerCase()}. +${weapon.dmg[level]} DMG.`;
    },

    ability(level) {

      const action = ["Sneaking", "Dodging", "Backstabbing"];

      return `You picked up "A Rogue's Guide to ${action[level - 1]}."`;

    },

    potion(type) {
      return `You picked up a ${type} potion.`;
    }

  },

  loot(type) {

    const items = ["map", "lockpick", "health potion", "damage potion"];

    return `You found a ${items[type]}!`;

  },

  use: {

    weapon(type, success, recover) {

      const stun = success ? "You knock your opponent unconscious." : "Your opponent resists your stunning blow.";

      const effects = [
        recover ? "Your opponent recovers." : stun,
        success ? "You disable your opponent's sword arm." : "Your opponent parries your chop at his tendons.",
        success ? "You sever your opponent's artery." : "Your opponent dodges your dagger strike."
      ];

      return effects[type - 1];

    },

    debuff(type, success, recover) {

      const stun = success ? "Your opponent knocks you unconscious." : "You resist your opponent's stunning blow.";

      const effects = [
        recover ? "You recover." : stun,
        success ? "Your opponent disables your sword arm." : "You parry your opponent's chop at your tendons.",
        success ? "Your opponent severs your artery." : "You dodge your opponent's dagger strike."
      ];

      return effects[type - 1];

    },

    ability(type, vanish, cancel, attack) {

      const sneak = vanish ? "You vanish from sight." : "You slip into the shadows.";

      const effects = [
        cancel ? "You step out of hiding." : sneak,
        "You dodged an attack.",
        attack ? "You stab a vital organ." : "You hold your dagger at the ready."
      ];

      return effects[type - 1];

    },

    potion(type, spoiled, hp) {
      return `You drank a ${type} potion.${spoiled ? " It was spoiled." : ""}${hp ? ` +${roundTo(hp, 1)}% HP.` : ""}`;
    },

    bottle(success, recover) {

      const blind = `You throw the empty bottle. ${success ? "It blinds your opponent." : "It misses."}`;

      return recover ? "Your opponent recovers." : blind;

    }

  },

  ladder(type, level, potions) {

    const ascendText = type === 7 ? `You climb up to level ${level}.` : `You slip down to level ${level}.`;
    const potionText = potions ? " Your potions fall and break." : "";

    return `${ascendText}${potionText}`;

  },

  lockpick(picks, success) {

    const pickText = success ? "You pick the lock." : "Your pick breaks in the lock.";

    return picks ? pickText : "Your last pick broke in the lock. You'll have to force it.";

  },

  force: "You force the lock.",

  //switch

  swap: ["You put away your weapon.", "You heft your club.", "You unsheathe your sword.", "You draw your dagger."]

};

//exports

module.exports = { events };

"use strict";

//ability

const ability = {
  list: [
    ["None"],
    ["Sneak", "Use: \"E\"", "Move undetected. Increased weapon effects.", "CD: 3 ticks"],
    ["Dodge", "Passive", "Chance to avoid damage. Sneak breaks combat."],
    ["Backstab", "Use: \"R\"", "Strike from the shadows. Requires Sneak + Dagger.", "DR: 3 ticks"]
  ],
  type: ["None", "Sneak", "Dodge", "Backstab"]
};

//enemy types

const enemyTypes = ["Thug", "Ruffian", "Brute", "Boss"];

//player types

const playerTypes = ["Rogue", "Thief", "Bandit", "Boss"];

//weapon

const weapon = {
  list: [
    ["Unarmed", "10 DMG", "No effect"],
    ["Club", "15 DMG", "Stun", "DR: 3 ticks"],
    ["Sword", "25 DMG", "Disarm", "DR: 5 ticks"],
    ["Dagger", "20 DMG", "Bleed", "DR: 5 ticks"]
  ],
  type: ["Unarmed", "Club", "Sword", "Dagger"],
  dmg: [10, 15, 25, 20]
};

//exports

module.exports = {
  ability,
  enemyTypes,
  playerTypes,
  weapon
};

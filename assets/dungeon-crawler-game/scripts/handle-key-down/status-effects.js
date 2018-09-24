"use strict";

//status effects

const handleCharStatus = (params, effect) => {

  const { char } = params;

  if (char.active[effect]) {
    char.active[effect]--;
  } else if (!char.debuff[effect]) {
    return;
  }

  char.debuff[effect]--;

  if (effect === "bleed" && char.stats.hp > 10) {
    char.stats.hp -= 10;
  }

};

const checkCharStatus = (params) => {

  const { char } = params;

  const check = ["bsMult", "dmgMult", "drunk", "stun", "disarm", "bleed"];

  if (!char.active.sneak) {
    check.push("sneakCD");
  }

  for (const e of check) {
    handleCharStatus(params, e);
  }

};

const enemyEffectTicks = (params, enemy, group, effect) => {

  const { level, char, events, updateLog } = params;

  const lastTick = !enemy[group][effect];
  const recovers = enemy.stats.hp && enemy.hostile.includes(char.stats.id) && lastTick;

  const handlers = {

    blind() {
      if (recovers) {
        updateLog(events.use.bottle(null, true));
      }
    },

    stun() {
      if (recovers) {
        updateLog(events.use.weapon(1, null, true));
      }
    },

    disarm() {
      if (enemy.stats.hp && lastTick) {
        enemy.stats.dmg *= 2;
      }
    },

    bleed() {
      if (enemy.stats.hp > 10) {
        enemy.stats.hp -= 10;
      }
    },

    clear() {
      if (lastTick) {

        const [y, x] = enemy.stats.index;

        level[y][x] = 0;
        enemy.stats.index = [-Infinity, -Infinity];

      }
    }

  };

  handlers[effect]();

};

const handleEnemyStatus = (params, enemy, effect) => {
  if (enemy.active[effect]) {
    enemy.active[effect]--;
    enemyEffectTicks(params, enemy, "active", effect);
  } else if (enemy.debuff[effect]) {
    enemy.debuff[effect]--;
    enemyEffectTicks(params, enemy, "debuff", effect);
  }
};

const checkEnemyStatus = (params) => {

  const { enemies } = params;

  for (const e of enemies) {

    const check = ["blind", "stun", "disarm", "bleed"];

    if (!e.stats.hp) {
      check.push("clear");
    }

    for (const f of check) {
      handleEnemyStatus(params, e, f);
    }

  }

};

const statusEffects = (params) => {
  checkCharStatus(params);
  checkEnemyStatus(params);
};

//exports

module.exports = { statusEffects };

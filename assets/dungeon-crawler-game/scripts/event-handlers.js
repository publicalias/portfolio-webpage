"use strict";

//local imports

const { handleGameplay, keyDownParams } = require("./handle-key-down/handle-key-down");
const { newGame } = require("./new-game/new-game");

//global imports

const { select } = require("dom-api");
const { hookEvent } = require("react-utils");
const { cycleItems, deepCopy } = require("utilities");

//node modules

const { useEffect, useRef } = require("react");

//get handlers

const cycleWeapons = (char, eventLog, hoverInfo, events) => {

  const held = Object.entries(char.items.weapons)
    .filter(([, val]) => val)
    .map(([key]) => Number(key));

  if (held.length < 2) {
    return;
  }

  char.items.weapon = cycleItems(held, char.items.weapon);
  char.stats.dmg = char.stats.level * 5 + hoverInfo.weapon.dmg[char.items.weapon];
  char.active.bsMult = 0;

  eventLog.unshift(events.swap[char.items.weapon]);

  return {
    char,
    eventLog
  };

};

const cycleHints = (params) => {

  const { hints: [head, body], hintLevel, nextIndex } = params;

  let unlocked = [];

  for (const p in body) {
    if (p <= hintLevel) {
      unlocked = unlocked.concat(body[p]);
    }
  }

  const index = nextIndex % unlocked.length;

  return {
    hoverText: [head, unlocked[index]],
    nextIndex: index + 1
  };

};

const getHandlers = (state, setState, props) => ({

  //keydown

  keyDown(event) {

    const params = keyDownParams(state, props);

    const { merge, char } = params;

    if (!char.stats.hp || merge.win) {
      return;
    }

    handleGameplay(params, event);

    merge.start = true;

    setState(merge);

    if (!char.stats.hp || merge.win) {
      setTimeout(() => {
        setState(newGame(props));
      }, 3000);
    }

  },

  //button

  swap() {

    const { char, win, eventLog } = state;
    const { hoverInfo, events } = props;

    if (!char.stats.hp || win || char.debuff.stun || char.debuff.disarm) {
      return;
    }

    const merge = cycleWeapons(deepCopy(char), eventLog.slice(), hoverInfo, events);

    if (merge) {
      setState(merge);
    }

  },

  hint() {

    const { char, win, hintLevel, nextIndex } = state;

    if (!char.stats.hp || win) {
      return;
    }

    const params = {
      hints: props.hoverInfo.hints,
      hintLevel,
      nextIndex
    };

    setState(cycleHints(params));

  },

  //canvas

  hover(hoverText) {
    if (state.char.stats.hp && !state.win) {
      setState({ hoverText });
    }
  }

});

//use keydown

const useKeyDown = (handlers) => {

  const enabled = useRef(true);

  useEffect(() => {

    const id = setInterval(() => {
      enabled.current = true;
    }, 100);

    return () => {
      clearInterval(id);
    };

  }, []);

  useEffect(() => hookEvent(select(window), "keydown", (event) => {

    const arrows = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];

    if (arrows.includes(event.key)) {
      event.preventDefault();
    }

    if (enabled.current) {
      enabled.current = false;
      handlers.keyDown(event);
    }

  }));

};

//exports

module.exports = {
  getHandlers,
  useKeyDown
};

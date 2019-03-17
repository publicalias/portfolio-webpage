"use strict";

//local imports

const { handleGameplay, keyDownParams } = require("./handle-key-down/handle-key-down");
const { newGame } = require("./new-game/new-game");

//global imports

const { select } = require("dom-api");
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

const getHandlers = (state, setState, props) => {

  const resize = () => {

    const w = Math.round(select(".js-resize-level").rect().width);
    const h = Math.round(w * 0.8);

    select(".js-resize-sidebar").rect({ height: h });
    select(".js-resize-event-log").rect({ height: h * 0.15 });

    setState({ canvas: [w, h] });

  };

  const handlers = {

    //keydown

    keyDown(event) {

      const params = keyDownParams(deepCopy(state), props);

      const { state: merge, char } = params;

      if (!char.stats.hp || merge.win) {
        return;
      }

      handleGameplay(params, event);

      setState(Object.assign(merge, { start: true }));

      if (!char.stats.hp || state.win) {
        setTimeout(() => {
          setState(newGame(props), resize);
        }, 3000);
      }

    },

    //button

    swap() {

      const debuff = state.char.debuff;

      if (state.win || debuff.stun || debuff.disarm) {
        return;
      }

      const char = deepCopy(state.char);
      const eventLog = state.eventLog.slice();

      const merge = cycleWeapons(char, eventLog, props.hoverInfo, props.events);

      if (merge) {
        setState(merge);
      }

    },

    hint() {

      if (state.win) {
        return;
      }

      const params = {
        hints: props.hoverInfo.hints,
        hintLevel: state.hintLevel,
        nextIndex: state.nextIndex
      };

      setState(cycleHints(params));

    },

    //canvas

    hover(hoverText) {
      if (!state.win) {
        setState({ hoverText });
      }
    },

    resize

  };

  return handlers;

};

//use keydown

const useKeyDown = (handlers) => {

  const enabled = useRef(true);

  useEffect(() => {
    setInterval(() => {
      enabled.current = true;
    }, 100);
  }, []);

  useEffect(() => {

    const fn = (event) => {

      const arrows = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];

      if (arrows.includes(event.key)) {
        event.preventDefault();
      }

      if (enabled.current) {
        enabled.current = false;
        handlers.keyDown(event);
      }

    };

    select(window).on("keydown", fn);

    return () => {
      select(window).off("keydown", fn);
    };

  });

};

//exports

module.exports = {
  getHandlers,
  useKeyDown
};

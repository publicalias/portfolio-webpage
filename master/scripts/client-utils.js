"use strict";

//local imports

const { select } = require("./dom-api");
const { handleTeardown, hookEvent } = require("./react-utils");

//check input

const checkInput = () => {

  const DOMInput = select(".js-check-input");

  const state = {
    timer: null,
    blocked: false
  };

  const setClass = (touch) => {
    DOMInput.class("is-touch", true, touch).class("is-mouse", true, !touch);
  };

  const isTouch = () => {

    clearTimeout(state.timer);

    state.blocked = true;

    state.timer = setTimeout(() => {
      state.blocked = false;
    }, 500);

    setClass(true);

  };

  const isMouse = () => {
    if (!state.blocked) {
      setClass(false);
    }
  };

  return handleTeardown([
    hookEvent(DOMInput, "touchstart", isTouch, { passive: true }),
    hookEvent(DOMInput, "mouseover", isMouse)
  ]);

};

//encode api call

const encodeAPICall = ({ path, method, data }) => method === "GET" || method === "DELETE" ? {
  path: `${path}?data=${encodeURIComponent(JSON.stringify(data))}`,
  init: { method }
} : {
  path,
  init: {
    method,
    body: JSON.stringify({ data }),
    headers: new Headers({ "Content-Type": "application/json" })
  }
};

//get json

const getJSON = async (path, init) => {

  const res = await fetch(path, init);

  if (!res.ok) {
    throw Error(`${res.status} ${res.statusText}`);
  }

  return res.json();

};

//init storage key / storage key

const initStorageKey = (path) => (key, val, session) => {

  const store = session ? sessionStorage : localStorage;

  const namespace = path || location.pathname.split("/")
    .filter((e) => e)
    .join("-");

  const innerKey = `${namespace}-${key}`;

  const getVal = () => store[innerKey] && JSON.parse(store[innerKey]).val;
  const setVal = (val) => {
    store[innerKey] = JSON.stringify({ val });
  };

  if (val !== null && val !== undefined) {
    setVal(typeof val === "function" ? val(getVal()) : val);
  }

  return getVal();

};

const storageKey = initStorageKey();

//submit keys

const submitKeys = (id) => {

  const pairID = id ? `-${id}` : "";

  const DOMInput = select(`.js-submit-input${pairID}`);
  const DOMButton = select(`.js-submit-button${pairID}`);

  const ignore = ["Enter", "Tab", "Shift"];

  return handleTeardown([

    hookEvent(DOMInput, "keydown", (event) => {
      if (event.key === "Enter") {
        DOMButton.focus(); //fires event
      }
    }),

    hookEvent(DOMButton, "keydown", (event) => {
      if (!ignore.includes(event.key)) {
        DOMInput.focus();
      }
    })

  ]);

};

//swipe event

const swipeEvent = (start, end, height, width) => {

  const touchStart = start.changedTouches[0];
  const touchEnd = end.changedTouches[0];

  const d = {
    t: end.timeStamp - start.timeStamp,
    x: touchStart.clientX - touchEnd.clientX,
    y: touchStart.clientY - touchEnd.clientY
  };

  const v = {
    absX: Math.abs(d.x),
    absY: Math.abs(d.y),
    w: width * 0.25,
    h: height * 0.25
  };

  if (d.t < 250) {
    if (v.absX > v.w && v.absY < v.h) {
      return Math.sign(d.x) === 1 ? "left" : "right";
    } else if (v.absX < v.w && v.absY > v.h) {
      return Math.sign(d.y) === 1 ? "up" : "down";
    }
  }

};

//exports

module.exports = {
  checkInput,
  encodeAPICall,
  getJSON,
  initStorageKey,
  storageKey,
  submitKeys,
  swipeEvent
};

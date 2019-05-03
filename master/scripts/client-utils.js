"use strict";

//local imports

const { select } = require("./dom-api");
const { bindObject } = require("./utilities");

//check input

const DOMInput = select(".js-check-input");

const utils = {

  timer: null,
  block: false,

  isTouch() {

    clearTimeout(this.timer);

    this.block = true;

    this.timer = setTimeout(() => {
      this.block = false;
    }, 500);

    DOMInput.class("is-mouse", true, false).class("is-touch", true, true);

  },

  isMouse() {

    if (this.block) {
      return;
    }

    DOMInput.class("is-mouse", true, true).class("is-touch", true, false);

  }

};

bindObject(utils);

const checkInput = () => {
  DOMInput.on("touchstart", utils.isTouch, { passive: true }).on("mouseover", utils.isMouse);
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

//parse query

const parseQuery = () => {

  const set = new URLSearchParams(new URL(location.href).search);

  const obj = {};

  for (const [key, val] of set) {
    obj[key] = val;
  }

  return obj;

};

//submit keys

const submitKeys = (id) => {

  const pairID = id ? `-${id}` : "";

  const DOMInput = select(`.js-submit-input${pairID}`);
  const DOMButton = select(`.js-submit-button${pairID}`);

  DOMInput.on("keydown", (event) => {
    if (event.key === "Enter") {
      DOMButton.focus(); //fires event
    }
  });

  DOMButton.on("keydown", (event) => {

    const ignore = ["Enter", "Tab", "Shift"];

    if (!ignore.includes(event.key)) {
      DOMInput.focus();
    }

  });

};

//exports

module.exports = {
  checkInput,
  encodeAPICall,
  getJSON,
  initStorageKey,
  parseQuery,
  storageKey,
  submitKeys
};

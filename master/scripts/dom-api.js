"use strict";

/*global TweenMax, Linear*/

//utilities

const animateUtil = (api, list) => (props, fn) => {

  TweenMax.to(list, 0.5, Object.assign(props, {
    ease: Linear.easeNone,
    onComplete: fn
  }));

  return api;

};

const getNodeList = (query) => {

  if (typeof query === "string") {
    return Array.from(document.querySelectorAll(query)); //query string
  } else if (typeof query[Symbol.iterator] !== "function") {
    return [query]; //node
  }

  return Array.from(query); //node list

};

const delegate = (fn, parent, child) => (event) => {

  const path = event.composedPath();

  const childList = getNodeList(child);

  for (let i = 0; i < path.indexOf(parent); i++) {

    if (childList.includes(path[i])) {

      fn(event);

      return;

    }
  }

};

const eventUtil = (api, list) => (events, ...args) => {

  const fn = args.length === 1 ? args[0] : args[1];
  const child = args.length === 1 ? null : args[0];

  for (const e of list) {
    for (const f of events.split(" ")) {
      e.addEventListener(f, child ? delegate(fn, e, child) : fn);
    }
  }

  return api;

};

const getOrSet = (api, list, set, getter, setter) => {

  const values = [];

  for (const e of list) {
    if (set) {
      setter(e);
    } else {
      values.push(getter(e));
    }
  }

  if (set) {
    return api;
  } else if (values.length > 1) {
    return values;
  }

  return values[0];

};

const classUtil = (api, list) => (classes, toggle, force) => {

  const classList = classes.split(" ");

  const getter = (e) => {

    for (const f of classList) {
      if (!e.classList.contains(f)) {
        return false;
      }
    }

    return true;

  };

  const setter = (e) => {
    for (const f of classList) {
      e.classList.toggle(f, force);
    }
  };

  return getOrSet(api, list, toggle, getter, setter);

};

const contentUtil = (api, list, text) => (content, overwrite, position = "beforeend") => {

  const getProp = text ? "textContent" : "innerHTML";
  const setProp = text ? "insertAdjacentText" : "insertAdjacentHTML";

  const getter = (e) => e[getProp];

  const setter = (e) => {
    if (overwrite) {
      e[getProp] = content;
    } else {
      e[setProp](position, content);
    }
  };

  return getOrSet(api, list, content !== undefined, getter, setter);

};

const cssUtil = (api, list) => (styles) => {

  const getter = (e) => window.getComputedStyle(e);

  const setter = (e) => {
    Object.assign(e.style, styles);
  };

  return getOrSet(api, list, styles, getter, setter);

};

const parseCSS = (e, prop) => {

  const [t, r, b, l] = window.getComputedStyle(e)[prop]
    .split(" ")
    .map((e) => parseFloat(e));

  return {
    t,
    r: r || t,
    b: b || t,
    l: l || r || t
  };

};

const rectUtil = (api, list) => (rect) => {

  const getter = (e) => e.getBoundingClientRect();

  const setter = (e) => {

    const { height, width } = rect;

    const b = parseCSS(e, "borderWidth");
    const p = parseCSS(e, "padding");

    const styles = {};

    if (height !== undefined) {
      styles.height = `${Math.max(height - b.t - b.b - p.t - p.b, 0)}px`;
    }

    if (width !== undefined) {
      styles.width = `${Math.max(width - b.r - b.l - p.r - p.l, 0)}px`;
    }

    Object.assign(e.style, styles);

  };

  return getOrSet(api, list, rect, getter, setter);

};

//select

const select = (query) => {

  const list = getNodeList(query);

  if (list.length === 0) {
    return;
  }

  const undef = list.length > 1 ? list : list[0]; //default to the node or node list

  const api = {};

  Object.assign(api, {
    animate: animateUtil(api, list),
    on: eventUtil(api, list),
    class: classUtil(api, list),
    text: contentUtil(api, list, true),
    html: contentUtil(api, list),
    css: cssUtil(api, list),
    rect: rectUtil(api, list)
  });

  return new Proxy(api, {

    get(obj, key) {

      if (obj.hasOwnProperty(key)) {
        return obj[key];
      } else if (typeof undef[key] === "function") {
        return (...args) => undef[key](...args);
      }

      return undef[key];

    },

    set(obj, key, val) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = val;
      } else {
        undef[key] = val;
      }
    }

  });

};

//exports

module.exports = { select };

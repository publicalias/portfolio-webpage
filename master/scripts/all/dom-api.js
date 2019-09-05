"use strict";

//node modules

const { TweenMax } = require("gsap/umd/TweenMax");

//utilities

const getNodeList = (query) => {

  const isElement = query instanceof Element;
  const isSpecial = query === document || query === window;

  if (typeof query === "string") {
    return Array.from(document.querySelectorAll(query)); //query string
  } else if (isElement || isSpecial) {
    return [query]; //node, document, or window
  }

  return Array.from(query); //node list

};

const getOrSet = (api, set, getter, setter) => {

  const { all } = api;

  const values = [];

  for (const e of all) {
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

//select

const animateUtil = (api) => (props, fn) => {

  const { all } = api;

  TweenMax.to(all, 0.5, Object.assign(props, { onComplete: fn }));

  return api;

};

const defineArgs = (args) => typeof args[0] === "function" ? {
  fn: args[0],
  options: args[1]
} : {
  child: args[0],
  fn: args[1],
  options: args[2]
};

const delegate = (fn, parent, child) => (event) => {

  const path = event.composedPath();

  const list = getNodeList(child);

  for (let i = 0; i < path.indexOf(parent); i++) {
    if (list.includes(path[i])) {

      fn(event);

      return;

    }
  }

};

const eventUtil = (api, add) => (events, ...args) => {

  const { all } = api;
  const { child, fn, options } = defineArgs(args);

  const method = add ? "addEventListener" : "removeEventListener";

  for (const e of all) {
    for (const f of events.split(" ")) {
      e[method](f, child ? delegate(fn, e, child) : fn, options);
    }
  }

  return api;

};

const classUtil = (api) => (classes, toggle, force) => {

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

  return getOrSet(api, toggle, getter, setter);

};

const contentUtil = (api, isText) => (content, append, position = "beforeend") => {

  const getProp = isText ? "textContent" : "innerHTML";
  const setProp = isText ? "insertAdjacentText" : "insertAdjacentHTML";

  const getter = (e) => e[getProp];

  const setter = (e) => {
    if (append) {
      e[setProp](position, content);
    } else {
      e[getProp] = content;
    }
  };

  return getOrSet(api, content !== undefined, getter, setter);

};

const cssUtil = (api) => (styles) => {

  const getter = (e) => window.getComputedStyle(e);

  const setter = (e) => {
    Object.assign(e.style, styles);
  };

  return getOrSet(api, styles, getter, setter);

};

const parseCSS = (e) => {

  const props = ["Top", "Right", "Bottom", "Left"];

  const styles = window.getComputedStyle(e);

  return {
    b: props.map((e) => parseFloat(styles[`border${e}Width`])),
    p: props.map((e) => parseFloat(styles[`padding${e}`]))
  };

};

const rectUtil = (api) => (rect) => {

  const getter = (e) => {

    const { height, width, top, left } = e.getBoundingClientRect();

    return {
      height,
      width,
      top: top + window.scrollY,
      left: left + window.scrollX
    };

  };

  const setter = (e) => {

    const { height, width } = rect;
    const { b: [bt, br, bb, bl], p: [pt, pr, pb, pl] } = parseCSS(e);

    const borderBox = window.getComputedStyle(e).boxSizing === "border-box";

    if ("height" in rect) {
      e.style.height = `${borderBox ? height : Math.max(height - bt - bb - pt - pb, 0)}px`;
    }

    if ("width" in rect) {
      e.style.width = `${borderBox ? width : Math.max(width - br - bl - pr - pl, 0)}px`;
    }

  };

  return getOrSet(api, rect, getter, setter);

};

const proxyDOM = (api) => new Proxy(api, {

  get(obj, key) {

    const { first, all } = obj;

    const firstOrAll = (fn) => all.length > 1 ? all.map(fn) : fn(first);

    if (obj.hasOwnProperty(key)) {
      return obj[key];
    } else if (typeof first[key] === "function") {
      return (...args) => firstOrAll((e) => e[key](...args));
    }

    return firstOrAll((e) => e[key]);

  },

  set(obj, key, val) {

    const { first, all } = obj;

    if (obj.hasOwnProperty(key)) {
      obj[key] = val;
    } else if (all.length > 1) {
      for (const e of all) {
        e[key] = val;
      }
    } else {
      first[key] = val; //error on null
    }

    return true;

  }

});

const select = (query) => {

  const list = getNodeList(query);

  const api = {
    first: list[0] || null,
    all: list
  };

  Object.assign(api, {
    animate: animateUtil(api),
    on: eventUtil(api, true),
    off: eventUtil(api),
    class: classUtil(api),
    text: contentUtil(api, true),
    html: contentUtil(api),
    css: cssUtil(api),
    rect: rectUtil(api)
  });

  return proxyDOM(api);

};

//exports

module.exports = { select };

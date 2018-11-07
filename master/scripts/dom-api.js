"use strict";

/*global TweenMax, Linear*/

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

  TweenMax.to(all, 0.5, Object.assign(props, {
    ease: Linear.easeNone,
    onComplete: fn
  }));

  return api;

};

const defineArgs = (args) => {

  if (typeof args[0] === "function") {
    return {
      fn: args[0],
      options: args[1]
    };
  }

  return {
    child: args[0],
    fn: args[1],
    options: args[2]
  };

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

const eventUtil = (api) => (events, ...args) => {

  const { all } = api;
  const { child, fn, options } = defineArgs(args);

  for (const e of all) {
    for (const f of events.split(" ")) {
      e.addEventListener(f, child ? delegate(fn, e, child) : fn, options);
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

const contentUtil = (api, text) => (content, append, position = "beforeend") => {

  const getProp = text ? "textContent" : "innerHTML";
  const setProp = text ? "insertAdjacentText" : "insertAdjacentHTML";

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

  return getOrSet(api, rect, getter, setter);

};

const proxyProto = (obj, proto) => new Proxy(obj, {

  get(obj, key) {

    if (obj.hasOwnProperty(key)) {
      return obj[key];
    } else if (typeof proto[key] === "function") {
      return (...args) => proto[key](...args);
    }

    return proto[key];

  },

  set(obj, key, val) {

    if (obj.hasOwnProperty(key)) {
      obj[key] = val;
    } else {
      proto[key] = val;
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

  const proto = list.length > 1 ? api.all : api.first; //default to the node or node list

  Object.assign(api, {
    animate: animateUtil(api),
    on: eventUtil(api),
    class: classUtil(api),
    text: contentUtil(api, true),
    html: contentUtil(api),
    css: cssUtil(api),
    rect: rectUtil(api)
  });

  return proxyProto(api, proto);

};

//exports

module.exports = { select };

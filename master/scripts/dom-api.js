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

const animateUtil = (api, props, fn) => {

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

const eventUtil = (api, events, ...args) => {

  const { all } = api;
  const { child, fn, options } = defineArgs(args);

  for (const e of all) {
    for (const f of events.split(" ")) {
      e.addEventListener(f, child ? delegate(fn, e, child) : fn, options);
    }
  }

  return api;

};

const classUtil = (api, classes, toggle, force) => {

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

const contentUtil = (api, isText, content, append, position = "beforeend") => {

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

const cssUtil = (api, styles) => {

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

const rectUtil = (api, rect) => {

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

const proxyDOM = (api) => new Proxy(api, {

  get(obj, key) {

    const { first, all } = obj;

    const firstOrAll = (fn) => all.length > 1 ? all.map((e) => fn(e)) : fn(first);

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

  const wrap = (util, ...opts) => (...args) => util(api, ...opts, ...args);

  Object.assign(api, {
    animate: wrap(animateUtil), //should use one function for all instances
    on: wrap(eventUtil),
    class: wrap(classUtil),
    text: wrap(contentUtil, true),
    html: wrap(contentUtil, false),
    css: wrap(cssUtil),
    rect: wrap(rectUtil)
  });

  return proxyDOM(api);

};

//exports

module.exports = { select };

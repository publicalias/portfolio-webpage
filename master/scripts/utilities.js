"use strict";

//arr equal

const arrEqual = (a, b) => a.toString() === b.toString();

//bind object

const bindObject = (to, from = to, done = []) => {

  done.push(from);

  for (const p in from) {

    const prop = from[p];
    const cyclic = done.includes(prop);

    switch (typeof prop) {
      case "function":
        from[p] = prop.bind(to);
        break;
      case "object":
        if (!cyclic) {
          bindObject(to, prop, done);
        }
    }

  }

};

//chance

const chance = (val) => Math.random() >= (100 - val) / 100;

//cycle items

const cycleItems = (arr, val) => arr[(arr.indexOf(val) + 1) % arr.length];

//deep copy

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

//get json

const getJSON = (url) => fetch(url).then((res) => {

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res.json();

});

//item is in view

const itemIsInView = ($item, addTop = 0, addBottom = 0) => {

  const windowTop = $(document.scrollingElement).scrollTop();
  const windowBottom = windowTop + $(window).outerHeight();

  const itemTop = $item.offset().top;
  const itemBottom = itemTop + $item.outerHeight();

  const notAbove = windowBottom - addBottom > itemTop;
  const notBelow = windowTop + addTop < itemBottom;

  return notAbove && notBelow;

};

//rng int

const rngInt = (min, max, inclusive = false) => Math.floor(Math.random() * (max - min + (inclusive ? 1 : 0))) + min;

//round to

const roundTo = (val, dec) => Math.round(val * Math.pow(10, dec)) / Math.pow(10, dec);

//lead zero

const leadZero = (val) => `${val < 10 ? "0" : ""}${val}`;

//months

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

//send data

const sendData = (res) => (err, status, body) => {
  if (err) {
    res.sendStatus(502);
  } else {
    res.send(body);
  }
};

//smooth scroll

const smoothScroll = (scrollTop) => {
  $(document.scrollingElement).animate({ scrollTop });
};

//storage key

const storageKey = (key, val, session) => {

  const store = session ? sessionStorage : localStorage;

  const namespace = location.pathname.split("/")
    .filter((e) => e)
    .join("-");

  const innerKey = `${namespace}-${key}`;
  const innerVal = JSON.stringify({ val });

  if (val === null || val === undefined) {
    return store[innerKey] && JSON.parse(store[innerKey]).val;
  }

  store[innerKey] = innerVal;

};

//void link

const voidLink = (link) => link || "javascript:void(0)";

//wrap fn

const wrapFn = (fn, ...args) => () => fn(...args);

//exports

module.exports = {
  arrEqual,
  bindObject,
  chance,
  cycleItems,
  deepCopy,
  getJSON,
  itemIsInView,
  rngInt,
  roundTo,
  leadZero,
  months,
  sendData,
  smoothScroll,
  storageKey,
  voidLink,
  wrapFn
};

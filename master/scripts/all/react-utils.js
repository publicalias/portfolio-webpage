"use strict";

//global imports

const { get, hash } = require("all/utilities");

//node modules

const equal = require("fast-deep-equal");
const React = require("react");

const { useEffect, useLayoutEffect, useRef, useState } = React;

//handle teardown

const handleTeardown = (list) => () => {
  for (const e of list) {
    e();
  }
};

//hook event

const hookEvent = (DOMNode, ...args) => {

  DOMNode.on(...args);

  return () => {
    DOMNode.off(...args);
  };

};

//init key gen

const initKeyGen = () => {

  const usedKeys = new Set();

  const checkKey = (sum, i = 0) => {

    const key = `${i}-${sum}`;

    if (usedKeys.has(key)) {
      return checkKey(sum, i + 1);
    }

    usedKeys.add(key);

    return key;

  };

  return (str) => checkKey(hash(str));

};

//optimize

const optimize = (Component) => {

  if (!Component.propList || Component.memoized) {
    return Component;
  }

  const getJSX = (next, list = []) => {

    const jsx = next.map((e) => Object.values(get(e, "injected.jsx") || {}));

    return next.length ? getJSX(jsx.flat(), list.concat(jsx)) : list;

  };

  const all = getJSX([Component]);
  const first = all[0] || [];

  const wrapper = React.memo(Component, (prev, next) => {

    const match = (key) => equal(get(prev, key), get(next, key));

    const propList = all.flat()
      .reduce((acc, e) => acc.concat(e.propList || []), Component.propList)
      .filter((e, i, arr) => arr.lastIndexOf(e) === i);

    return propList.reduce((acc, e) => match(e) ? acc : false, true);

  });

  Component.memoized = true;

  first.forEach((e) => {
    Component.injected.jsx[e.name] = optimize(e);
  });

  return wrapper;

};

//use interval

const useInterval = (fn, speed) => {

  const callback = useRef();

  useEffect(() => {
    callback.current = fn;
  });

  useEffect(() => {

    if (typeof speed !== "number") {
      return;
    }

    const id = setInterval(() => {
      callback.current();
    }, speed);

    return () => {
      clearInterval(id);
    };

  }, [speed]);

};

//use set state

const useSetState = (initialState) => {

  const [state, setState] = useState(initialState);

  const { current: queue } = useRef([]);

  useLayoutEffect(() => {
    while (queue.length) {
      queue.shift()();
    }
  });

  return [state, (merge, fn) => {

    if (fn) {
      queue.push(fn);
    }

    setState((state) => Object.assign({}, state, merge));

  }];

};

//use teardown

const useTeardown = (getList, bool) => {
  useEffect(() => handleTeardown(getList()), bool);
};

//exports

module.exports = {
  handleTeardown,
  hookEvent,
  initKeyGen,
  optimize,
  useInterval,
  useSetState,
  useTeardown
};

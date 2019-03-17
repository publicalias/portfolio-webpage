"use strict";

//node modules

const { useEffect, useRef, useState } = require("react");

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

  return (str) => {

    const sum = str.split("").reduce((acc, e) => acc + e.codePointAt(), 0);

    return checkKey(sum);

  };

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

const useSetState = (initialState, props) => {

  const [state, setState] = useState(initialState);

  const { current: queue } = useRef([]);

  useEffect(() => {
    while (queue.length) {
      queue.shift()(state, props);
    }
  });

  return [state, (merge, fn) => {

    const next = typeof merge === "function" ? merge : () => merge;

    if (fn) {
      queue.push(fn);
    }

    setState((prev) => Object.assign({}, prev, next(prev)));

  }];

};

//exports

module.exports = {
  initKeyGen,
  useInterval,
  useSetState
};

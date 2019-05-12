"use strict";

//node modules

const { useEffect, useLayoutEffect, useRef, useState } = require("react");

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

//exports

module.exports = {
  initKeyGen,
  useInterval,
  useSetState
};

"use strict";

//bind react class

const bindReactClass = (that) => {

  const ignore = [
    "constructor",
    "getDerivedStateFromProps",
    "render",
    "componentDidMount",
    "shouldComponentUpdate",
    "getSnapshotBeforeUpdate",
    "componentDidUpdate",
    "componentWillUnmount",
    "componentDidCatch"
  ];

  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(that));

  for (const e of methods) {
    if (!ignore.includes(e)) {
      that[e] = that[e].bind(that);
    }
  }

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

  return (str) => {

    const sum = str.split("").reduce((acc, e) => acc + e.codePointAt(), 0);

    return checkKey(sum);

  };

};

//exports

module.exports = {
  bindReactClass,
  initKeyGen
};

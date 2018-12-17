"use strict";

//global imports

const { deepCopy } = require("utilities");

//meta set state

const META_SET_STATE = (state, { merge, options }) => {

  const deep = deepCopy(state, merge);
  const shallow = Object.assign(deepCopy(state), merge);

  return options.shallow ? shallow : deep;

};

//exports

module.exports = { META_SET_STATE };

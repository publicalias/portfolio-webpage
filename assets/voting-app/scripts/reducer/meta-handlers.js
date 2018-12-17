"use strict";

//global imports

const { deepCopy } = require("utilities");

//meta add errors

const META_ADD_ERRORS = (state, { errors }) => deepCopy(state, {
  errors: state.errors.concat(errors.map((e) => ({
    text: e,
    timer: 1000
  })))
});

//meta close error

const META_CLOSE_ERROR = (state, { index }) => {

  const nextState = deepCopy(state);

  nextState.errors.splice(index, 1);

  return nextState;

};

//meta set state

const META_SET_STATE = (state, { merge, options }) => {

  const deep = deepCopy(state, merge);
  const shallow = Object.assign(deepCopy(state), merge);

  return options.shallow ? shallow : deep;

};

//meta timeout error

const META_TIMEOUT_ERROR = (state) => {

  const errors = state.errors.map((e) => ({
    text: e.text,
    timer: e.timer - 100
  })).filter((e) => e.timer > 0);

  return deepCopy(state, { errors });

};

//exports

module.exports = {
  META_ADD_ERRORS,
  META_CLOSE_ERROR,
  META_SET_STATE,
  META_TIMEOUT_ERROR
};

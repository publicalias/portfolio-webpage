"use strict";

//global imports

const { deepCopy, initDeepCopy } = require("utilities");

//meta add errors

const META_ADD_ERRORS = (state, { errors }) => deepCopy(state, {
  errors: state.errors.concat(errors.map((e) => ({
    text: e,
    timer: 1000
  })))
});

//meta close error

const META_CLOSE_ERROR = (state, { index }) => {

  const errors = state.errors.filter((e, i) => i !== index);

  return deepCopy(state, { errors });

};

//meta set state

const META_SET_STATE = (state, { merge, config }) => initDeepCopy(config)(state, merge);

//meta timeout error

const META_TIMEOUT_ERROR = (state) => {

  const errors = deepCopy(state.errors).filter((e) => {

    e.timer -= 100;

    return e.timer;

  });

  return deepCopy(state, { errors });

};

//exports

module.exports = {
  META_ADD_ERRORS,
  META_CLOSE_ERROR,
  META_SET_STATE,
  META_TIMEOUT_ERROR
};

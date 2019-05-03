"use strict";

//local imports

const { newError } = require("../schemas/master");
const { deepCopy, initDeepCopy } = require("../utilities");

//meta add errors

const META_ADD_ERRORS = (state, { errors }) => {

  const mapFn = (e) => newError({ text: e });

  return deepCopy(state, { errors: state.errors.concat(errors.map(mapFn)) });

};

//meta close error

const META_CLOSE_ERROR = (state) => {

  const filterFn = (e, i) => i > 0;

  return deepCopy(state, { errors: state.errors.filter(filterFn) });

};

//meta no op

const META_NO_OP = (state) => state;

//meta set state

const META_SET_STATE = (state, { merge, config }) => initDeepCopy(config)(state, merge);

//meta timeout error

const META_TIMEOUT_ERROR = (state) => {

  const mapFn = (e, i) => i > 0 ? e : {
    text: e.text,
    timer: e.timer - 100
  };

  return deepCopy(state, { errors: state.errors.map(mapFn) });

};

//exports

module.exports = {
  META_ADD_ERRORS,
  META_CLOSE_ERROR,
  META_NO_OP,
  META_SET_STATE,
  META_TIMEOUT_ERROR
};

"use strict";

//local imports

const { newError } = require("../schemas");
const { deepCopy, initDeepCopy } = require("../utilities");

//meta add errors

const META_ADD_ERRORS = (state, { errors }) => {

  const list = state.errors.concat(errors.map((e) => newError({ text: e }))).reverse();
  const text = list.map((e) => e.text);

  const next = list.filter((e, i) => text.lastIndexOf(e.text) === i).reverse();

  return deepCopy(state, { errors: next });

};

//meta close error

const META_CLOSE_ERROR = (state) => deepCopy(state, { errors: state.errors.slice(1) });

//meta no op

const META_NO_OP = (state) => state;

//meta set loading

const META_SET_LOADING = (state, { loading }) => deepCopy(state, { loading: state.loading + (loading ? 1 : -1) });

//meta set state

const META_SET_STATE = (state, { merge, config }) => initDeepCopy(config)(state, merge);

//meta timeout error

const META_TIMEOUT_ERROR = (state) => deepCopy(state, {
  errors: state.errors.map((e, i) => i > 0 ? e : {
    text: e.text,
    timer: e.timer - 100
  })
});

//meta toggle delete

const META_TOGGLE_DELETE = (state) => deepCopy(state, { account: { delete: !state.account.delete } });

//exports

module.exports = {
  META_ADD_ERRORS,
  META_CLOSE_ERROR,
  META_NO_OP,
  META_SET_LOADING,
  META_SET_STATE,
  META_TIMEOUT_ERROR,
  META_TOGGLE_DELETE
};

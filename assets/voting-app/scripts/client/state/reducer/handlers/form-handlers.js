"use strict";

//local imports

const { newState } = require("../../../../../schemas");

//global imports

const { deepCopy } = require("utilities");

//form clear state

const FORM_CLEAR_STATE = (state) => deepCopy(state, { form: newState().form });

//form remove option

const FORM_REMOVE_OPTION = (state, { text }) => {

  const options = state.form.options.filter((e) => e !== text);

  return deepCopy(state, { form: { options } });

};

//form set add

const FORM_SET_ADD = (state, { add }) => deepCopy(state, { form: { add } });

//form toggle delete

const FORM_TOGGLE_DELETE = (state) => deepCopy(state, { form: { delete: !state.form.delete } });

//form toggle secret

const FORM_TOGGLE_SECRET = (state) => deepCopy(state, { form: { secret: !state.form.secret } });

//exports

module.exports = {
  FORM_CLEAR_STATE,
  FORM_REMOVE_OPTION,
  FORM_SET_ADD,
  FORM_TOGGLE_DELETE,
  FORM_TOGGLE_SECRET
};
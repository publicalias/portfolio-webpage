"use strict";

//local imports

const { initialState } = require("./initial-state");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//form discard poll

const FORM_DISCARD_POLL = (state) => deepCopy(state, initialState.form);

//form remove option

const FORM_REMOVE_OPTION = (state, { index }) => {

  const nextState = deepCopy(state);

  nextState.form.options.splice(index, 1);

  return nextState;

};

//form set add text

const FORM_SET_ADD_TEXT = (state, { add }) => deepCopy(state, { form: { add } });

//form set title text

const FORM_SET_TITLE_TEXT = (state, { title }) => deepCopy(state, { form: { title } });

//form toggle confirm

const FORM_TOGGLE_CONFIRM = (state) => deepCopy(state, { form: { confirm: !state.form.confirm } });

//form toggle private

const FORM_TOGGLE_PRIVATE = (state) => deepCopy(state, { form: { private: !state.form.private } });

//exports

module.exports = {
  FORM_DISCARD_POLL,
  FORM_REMOVE_OPTION,
  FORM_SET_ADD_TEXT,
  FORM_SET_TITLE_TEXT,
  FORM_TOGGLE_CONFIRM,
  FORM_TOGGLE_PRIVATE
};

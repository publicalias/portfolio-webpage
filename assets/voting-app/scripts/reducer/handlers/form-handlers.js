"use strict";

//local imports

const { initialState } = require("../initial-state");

//global imports

const { deepCopy } = require("utilities");

//form discard poll

const FORM_DISCARD_POLL = (state) => deepCopy(state, initialState.form);

//form remove option

const FORM_REMOVE_OPTION = (state, { text }) => {

  const nextState = deepCopy(state);
  const options = nextState.form.options;

  const index = options.findIndex((e) => e === text);

  options.splice(index, 1);

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

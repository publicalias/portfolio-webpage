"use strict";

//global imports

const { newState } = require("schemas/voting-app");
const { deepCopy } = require("utilities");

//form add option

const FORM_ADD_OPTION = (state) => deepCopy(state, {
  form: {
    options: state.form.options.concat(state.form.add),
    add: ""
  }
});

//form discard poll

const FORM_DISCARD_POLL = (state) => deepCopy(state, { form: newState().form });

//form remove option

const FORM_REMOVE_OPTION = (state, { text }) => {

  const options = state.form.options.filter((e) => e !== text);

  return deepCopy(state, { form: { options } });

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
  FORM_ADD_OPTION,
  FORM_DISCARD_POLL,
  FORM_REMOVE_OPTION,
  FORM_SET_ADD_TEXT,
  FORM_SET_TITLE_TEXT,
  FORM_TOGGLE_CONFIRM,
  FORM_TOGGLE_PRIVATE
};

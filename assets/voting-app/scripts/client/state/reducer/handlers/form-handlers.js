"use strict";

//local imports

const { newState } = require("../../../../../schemas");

//global imports

const { deepCopy } = require("all/utilities");

//form clear state

const FORM_CLEAR_STATE = (state) => deepCopy(state, { form: newState().form });

//form remove option

const FORM_REMOVE_OPTION = (state, { text }) => {

  const options = state.form.body.options.filter((e) => e !== text);

  return deepCopy(state, { form: { body: { options } } });

};

//form set add

const FORM_SET_ADD = (state, { add }) => deepCopy(state, { form: { body: { add } } });

//form set title

const FORM_SET_TITLE = (state, { title }) => deepCopy(state, { form: { body: { title } } });

//form toggle delete

const FORM_TOGGLE_DELETE = (state) => deepCopy(state, { form: { menu: { delete: !state.form.menu.delete } } });

//form toggle secret

const FORM_TOGGLE_SECRET = (state) => deepCopy(state, { form: { menu: { secret: !state.form.menu.secret } } });

//exports

module.exports = {
  FORM_CLEAR_STATE,
  FORM_REMOVE_OPTION,
  FORM_SET_ADD,
  FORM_SET_TITLE,
  FORM_TOGGLE_DELETE,
  FORM_TOGGLE_SECRET
};

"use strict";

//local imports

const { initialState } = require("../initial-state");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//menu open form

const MENU_OPEN_FORM = (state) => deepCopy(state, { page: "form" });

//menu set filter

const MENU_SET_FILTER = (state, { filter }) => deepCopy(state, {
  page: "list",
  list: deepCopy(initialState.list, { filter })
});

//exports

module.exports = {
  MENU_OPEN_FORM,
  MENU_SET_FILTER
};

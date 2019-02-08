"use strict";

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//menu open form

const MENU_OPEN_FORM = (state) => deepCopy(state, { page: "form" });

//menu toggle confirm

const MENU_TOGGLE_CONFIRM = (state) => deepCopy(state, { menu: { confirm: !state.menu.confirm } });

//exports

module.exports = {
  MENU_OPEN_FORM,
  MENU_TOGGLE_CONFIRM
};

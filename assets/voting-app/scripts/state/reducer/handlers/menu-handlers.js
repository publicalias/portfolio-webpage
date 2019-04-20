"use strict";

//global imports

const { deepCopy } = require("utilities");

//menu set filter

const MENU_SET_FILTER = (state, { filter }) => deepCopy(state, {
  list: {
    filter,
    index: 0
  }
});

//menu toggle confirm

const MENU_TOGGLE_CONFIRM = (state) => deepCopy(state, { menu: { confirm: !state.menu.confirm } });

//exports

module.exports = {
  MENU_SET_FILTER,
  MENU_TOGGLE_CONFIRM
};

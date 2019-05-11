"use strict";

//global imports

const { deepCopy } = require("utilities");

//menu toggle confirm

const MENU_TOGGLE_CONFIRM = (state) => deepCopy(state, { menu: { confirm: !state.menu.confirm } });

//exports

module.exports = { MENU_TOGGLE_CONFIRM };

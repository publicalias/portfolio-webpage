"use strict";

//global imports

const { deepMerge } = require("utilities");

//menu open form

const MENU_OPEN_FORM = (state) => deepMerge({}, state, { page: "form" });

//exports

module.exports = { MENU_OPEN_FORM };

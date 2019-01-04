"use strict";

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//menu open form

const MENU_OPEN_FORM = (state) => deepCopy(state, { page: "form" });

//exports

module.exports = { MENU_OPEN_FORM };

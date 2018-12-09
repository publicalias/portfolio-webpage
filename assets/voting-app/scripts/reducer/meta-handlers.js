"use strict";

//global imports

const { deepMerge } = require("utilities");

//meta set state

const META_SET_STATE = (state, { merge }) => deepMerge({}, state, merge);

//exports

module.exports = { META_SET_STATE };

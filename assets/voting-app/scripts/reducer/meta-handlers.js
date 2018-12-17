"use strict";

//global imports

const { deepCopy } = require("utilities");

//meta set state

const META_SET_STATE = (state, { merge }) => deepCopy({}, state, merge);

//exports

module.exports = { META_SET_STATE };

"use strict";

//local imports

const menuActions = require("./menu-actions");
const metaActions = require("./meta-actions");

//action creators

const actionCreators = Object.assign(menuActions, metaActions);

//exports

module.exports = actionCreators;

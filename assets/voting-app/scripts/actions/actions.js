"use strict";

//local imports

const menuActions = require("./menu-actions");
const metaActions = require("./meta-actions");

//actions

const actions = Object.assign(menuActions, metaActions);

//exports

module.exports = actions;

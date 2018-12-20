"use strict";

//local imports

const formActions = require("./form-actions");
const menuActions = require("./menu-actions");
const metaActions = require("./meta-actions");

//actions

const actions = Object.assign(formActions, menuActions, metaActions);

//exports

module.exports = { actions };

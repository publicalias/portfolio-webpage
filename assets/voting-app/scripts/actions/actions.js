"use strict";

//local imports

const formActions = require("./form-actions");
const listActions = require("./list-actions");
const menuActions = require("./menu-actions");
const metaActions = require("./meta-actions");

//actions

const actions = Object.assign(formActions, listActions, menuActions, metaActions);

//exports

module.exports = { actions };

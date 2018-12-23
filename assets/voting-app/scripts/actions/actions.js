"use strict";

//local imports

const formFactories = require("./factories/form-factories");
const listFactories = require("./factories/list-factories");
const menuFactories = require("./factories/menu-factories");
const metaFactories = require("./factories/meta-factories");

const formThunks = require("./thunks/form-thunks");
const listThunks = require("./thunks/list-thunks");
const menuThunks = require("./thunks/menu-thunks");
const metaThunks = require("./thunks/meta-thunks");

//actions

const actions = Object.assign(
  formFactories,
  listFactories,
  menuFactories,
  metaFactories,
  formThunks,
  listThunks,
  menuThunks,
  metaThunks
);

//exports

module.exports = { actions };

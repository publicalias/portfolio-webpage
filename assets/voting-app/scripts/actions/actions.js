"use strict";

//local imports

const formFactories = require("./factories/form-factories");
const listFactories = require("./factories/list-factories");
const menuFactories = require("./factories/menu-factories");
const metaFactories = require("./factories/meta-factories");
const viewFactories = require("./factories/view-factories");

const formThunks = require("./thunks/form-thunks");
const listThunks = require("./thunks/list-thunks");
const metaThunks = require("./thunks/meta-thunks");
const viewThunks = require("./thunks/view-thunks");

//actions

const actions = Object.assign(

  formFactories,
  listFactories,
  menuFactories,
  metaFactories,
  viewFactories,

  formThunks,
  listThunks,
  metaThunks,
  viewThunks

);

//exports

module.exports = { actions };

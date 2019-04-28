"use strict";

//local imports

const formFactories = require("./factories/form-factories");
const listFactories = require("./factories/list-factories");
const menuFactories = require("./factories/menu-factories");
const viewFactories = require("./factories/view-factories");

const formThunks = require("./thunks/form-thunks");
const listThunks = require("./thunks/list-thunks");
const menuThunks = require("./thunks/menu-thunks");
const metaThunks = require("./thunks/meta-thunks");
const viewThunks = require("./thunks/view-thunks");

//global imports

const metaFactories = require("redux-utils/meta-factories");

//actions

const actions = Object.assign(

  formFactories,
  listFactories,
  menuFactories,
  metaFactories,
  viewFactories,

  formThunks,
  listThunks,
  menuThunks,
  metaThunks,
  viewThunks

);

//exports

module.exports = { actions };

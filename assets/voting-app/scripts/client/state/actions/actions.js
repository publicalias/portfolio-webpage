"use strict";

//local imports

const formFactories = require("./factories/form-factories");
const listFactories = require("./factories/list-factories");
const viewFactories = require("./factories/view-factories");

const formThunks = require("./thunks/form-thunks");
const metaThunks = require("./thunks/meta-thunks");
const pollThunks = require("./thunks/poll-thunks");

//global imports

const metaFactoriesAll = require("redux/meta-factories");

//actions

const actions = Object.assign(

  formFactories,
  listFactories,
  metaFactoriesAll,
  viewFactories,

  formThunks,
  metaThunks,
  pollThunks

);

//exports

module.exports = { actions };

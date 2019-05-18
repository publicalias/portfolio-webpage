"use strict";

//local imports

const formFactories = require("./factories/form-factories");
const listFactories = require("./factories/list-factories");
const viewFactories = require("./factories/view-factories");

const listThunks = require("./thunks/list-thunks");
const metaThunks = require("./thunks/meta-thunks");
const pollThunks = require("./thunks/poll-thunks");

//global imports

const metaFactories = require("redux-utils/meta-factories");

//actions

const actions = Object.assign(

  formFactories,
  listFactories,
  metaFactories,
  viewFactories,

  listThunks,
  metaThunks,
  pollThunks

);

//exports

module.exports = { actions };

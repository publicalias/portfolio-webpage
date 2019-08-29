"use strict";

//local imports

const formFactories = require("./factories/form-factories");
const listFactories = require("./factories/list-factories");
const viewFactories = require("./factories/view-factories");

const formThunks = require("./thunks/form-thunks");
const metaThunks = require("./thunks/meta-thunks");
const pollThunks = require("./thunks/poll-thunks");

//global imports

const metaFactories = require("redux/meta-factories");

//actions

const actions = Object.assign(

  formFactories,
  listFactories,
  metaFactories,
  viewFactories,

  formThunks,
  metaThunks,
  pollThunks

);

//exports

module.exports = { actions };

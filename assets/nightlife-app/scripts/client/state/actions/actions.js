"use strict";

//local imports

const metaFactories = require("./factories/meta-factories");

const metaThunks = require("./thunks/meta-thunks");

//global imports

const metaFactoriesAll = require("redux/meta-factories");

//actions

const actions = Object.assign(

  metaFactories,
  metaFactoriesAll,

  metaThunks

);

//exports

module.exports = { actions };

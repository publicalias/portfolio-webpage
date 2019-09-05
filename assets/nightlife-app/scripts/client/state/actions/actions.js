"use strict";

//local imports

const metaFactories = require("./factories/meta-factories");
const userFactories = require("./factories/user-factories");

const metaThunks = require("./thunks/meta-thunks");
const userThunks = require("./thunks/user-thunks");

//global imports

const metaFactoriesAll = require("redux/meta-factories");

//actions

const actions = Object.assign(

  metaFactories,
  metaFactoriesAll,
  userFactories,

  metaThunks,
  userThunks

);

//exports

module.exports = { actions };

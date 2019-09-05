"use strict";

//local imports

const metaFactories = require("./factories/meta-factories");
const userFactories = require("./factories/user-factories");
const venueFactories = require("./factories/venue-factories");

const metaThunks = require("./thunks/meta-thunks");
const userThunks = require("./thunks/user-thunks");
const venueThunks = require("./thunks/venue-thunks");

//global imports

const metaFactoriesAll = require("redux/meta-factories");

//actions

const actions = Object.assign(

  metaFactories,
  metaFactoriesAll,
  userFactories,
  venueFactories,

  metaThunks,
  userThunks,
  venueThunks

);

//exports

module.exports = { actions };

"use strict";

//local imports

const metaFactories = require("./factories/meta-factories");
const userFactories = require("./factories/user-factories");
const venueFactories = require("./factories/venue-factories");

const favoriteThunks = require("./thunks/favorite-thunks");
const friendThunks = require("./thunks/friend-thunks");
const metaThunks = require("./thunks/meta-thunks");
const rsvpThunks = require("./thunks/rsvp-thunks");
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

  favoriteThunks,
  friendThunks,
  metaThunks,
  rsvpThunks,
  userThunks,
  venueThunks

);

//exports

module.exports = { actions };

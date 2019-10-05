"use strict";

//local imports

const favoriteHandlers = require("./handlers/favorite-handlers");
const friendHandlers = require("./handlers/friend-handlers");
const metaHandlers = require("./handlers/meta-handlers");
const rsvpHandlers = require("./handlers/rsvp-handlers");
const userHandlers = require("./handlers/user-handlers");
const venueHandlers = require("./handlers/venue-handlers");

//global imports

const { apiRouter } = require("redux/server-utils");

//router

const router = apiRouter(Object.assign(
  favoriteHandlers,
  friendHandlers,
  metaHandlers,
  rsvpHandlers,
  userHandlers,
  venueHandlers
));

//exports

module.exports = router;

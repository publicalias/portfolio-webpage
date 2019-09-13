"use strict";

//local imports

const favoriteHandlers = require("./handlers/favorite-handlers");
const friendHandlers = require("./handlers/friend-handlers");
const metaHandlers = require("./handlers/meta-handlers");

//global imports

const { apiRouter } = require("redux/server-utils");

//router

const router = apiRouter(Object.assign(
  favoriteHandlers,
  friendHandlers,
  metaHandlers
));

//exports

module.exports = router;

"use strict";

//local imports

const favoriteHandlers = require("./handlers/favorite-handlers");

//global imports

const { apiRouter } = require("redux/server-utils");

//router

const router = apiRouter(Object.assign(
  favoriteHandlers
));

//exports

module.exports = router;

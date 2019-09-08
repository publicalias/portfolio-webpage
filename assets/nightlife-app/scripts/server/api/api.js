"use strict";

//local imports

const favoriteHandlers = require("./handlers/favorite-handlers");

//global imports

const { apiHandler } = require("redux/server-utils");

//handle actions

const router = apiHandler(Object.assign(
  favoriteHandlers
));

//exports

module.exports = router;

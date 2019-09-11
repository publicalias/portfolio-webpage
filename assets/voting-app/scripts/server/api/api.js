"use strict";

//local imports

const formHandlers = require("./handlers/form-handlers");
const metaHandlers = require("./handlers/meta-handlers");
const pollHandlers = require("./handlers/poll-handlers");

//global imports

const { apiRouter } = require("redux/server-utils");

//router

const router = apiRouter(Object.assign(
  formHandlers,
  metaHandlers,
  pollHandlers
));

//exports

module.exports = router;

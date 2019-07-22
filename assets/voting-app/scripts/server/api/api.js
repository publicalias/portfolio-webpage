"use strict";

//local imports

const formHandlers = require("./handlers/form-handlers");
const metaHandlers = require("./handlers/meta-handlers");
const pollHandlers = require("./handlers/poll-handlers");

//global imports

const { apiHandler } = require("redux-utils/server-utils");

//handle actions

const router = apiHandler(Object.assign(
  formHandlers,
  metaHandlers,
  pollHandlers
));

//exports

module.exports = router;

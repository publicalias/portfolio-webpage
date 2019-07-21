"use strict";

//local imports

const metaHandlers = require("./handlers/meta-handlers");
const pollHandlers = require("./handlers/poll-handlers");

//global imports

const { apiHandler } = require(`${__scripts}/redux-utils/server-utils`);

//handle actions

const router = apiHandler(Object.assign(
  metaHandlers,
  pollHandlers
));

//exports

module.exports = router;

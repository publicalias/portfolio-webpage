"use strict";

//local imports

const metaHandlers = require("./handlers/meta-handlers");
const userHandlers = require("./handlers/user-handlers");
const venueHandlers = require("./handlers/venue-handlers");

const { newState } = require("../../../../schemas");

//global imports

const metaHandlersAll = require("redux/meta-handlers");

const { initReducer } = require("redux/client-utils");

//reducer

const reducer = initReducer(newState(), Object.assign(
  metaHandlers,
  metaHandlersAll,
  userHandlers,
  venueHandlers
));

//exports

module.exports = { reducer };

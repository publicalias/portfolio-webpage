"use strict";

//local imports

const formHandlers = require("./handlers/form-handlers");
const listHandlers = require("./handlers/list-handlers");
const viewHandlers = require("./handlers/view-handlers");

const { newState } = require("../../../../schemas");

//global imports

const metaHandlers = require("redux/meta-handlers");

const { initReducer } = require("redux/client-utils");

//reducer

const reducer = initReducer(newState(), Object.assign(
  formHandlers,
  listHandlers,
  metaHandlers,
  viewHandlers
));

//exports

module.exports = { reducer };

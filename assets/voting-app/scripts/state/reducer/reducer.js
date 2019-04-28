"use strict";

//local imports

const formHandlers = require("./handlers/form-handlers");
const listHandlers = require("./handlers/list-handlers");
const menuHandlers = require("./handlers/menu-handlers");
const viewHandlers = require("./handlers/view-handlers");

//global imports

const metaHandlers = require("redux-utils/meta-handlers");

const { initReducer } = require("redux-utils/client-utils");
const { newState } = require("schemas/voting-app");

//reducer

const reducer = initReducer(newState(), Object.assign(
  formHandlers,
  listHandlers,
  menuHandlers,
  metaHandlers,
  viewHandlers
));

//exports

module.exports = { reducer };

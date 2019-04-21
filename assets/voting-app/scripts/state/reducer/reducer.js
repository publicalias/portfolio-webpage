"use strict";

//local imports

const formHandlers = require("./handlers/form-handlers");
const listHandlers = require("./handlers/list-handlers");
const menuHandlers = require("./handlers/menu-handlers");
const metaHandlers = require("./handlers/meta-handlers");
const viewHandlers = require("./handlers/view-handlers");

const { initialState } = require("./initial-state");

//global imports

const { initReducer } = require("client-utils");

//reducer

const reducer = initReducer(initialState, Object.assign(
  formHandlers,
  listHandlers,
  menuHandlers,
  metaHandlers,
  viewHandlers
));

//exports

module.exports = {
  initialState,
  reducer
};

"use strict";

//local imports

const formHandlers = require("./handlers/form-handlers");
const listHandlers = require("./handlers/list-handlers");
const menuHandlers = require("./handlers/menu-handlers");
const metaHandlers = require("./handlers/meta-handlers");
const viewHandlers = require("./handlers/view-handlers");

const { initialState } = require("./initial-state");

//reducer

const reducer = (state = initialState, action) => {

  const handlers = Object.assign(
    formHandlers,
    listHandlers,
    menuHandlers,
    metaHandlers,
    viewHandlers
  );

  const valid = action && handlers[action.type];

  return valid ? valid(state, action) : state;

};

//exports

module.exports = {
  initialState,
  reducer
};

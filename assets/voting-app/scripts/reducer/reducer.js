"use strict";

//local imports

const formHandlers = require("./form-handlers");
const { initialState } = require("./initial-state");
const menuHandlers = require("./menu-handlers");
const metaHandlers = require("./meta-handlers");

//reducer

const reducer = (state = initialState, action) => {

  const handlers = Object.assign(formHandlers, menuHandlers, metaHandlers);

  const valid = action && handlers[action.type];

  return valid ? valid(state, action) : state;

};

//exports

module.exports = {
  initialState,
  reducer
};

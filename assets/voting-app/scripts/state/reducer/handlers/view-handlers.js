"use strict";

//global imports

const { newState } = require("schemas/voting-app");
const { deepCopy } = require("utilities");

//view clear state

const VIEW_CLEAR_STATE = (state) => deepCopy(state, { view: newState().view });

//view set add

const VIEW_SET_ADD = (state, { add }) => deepCopy(state, { view: { add } });

//view toggle confirm

const VIEW_TOGGLE_CONFIRM = (state) => deepCopy(state, { view: { confirm: !state.view.confirm } });

//view toggle settings

const VIEW_TOGGLE_SETTINGS = (state) => deepCopy(state, {
  view: {
    settings: !state.view.settings,
    confirm: false
  }
});

//exports

module.exports = {
  VIEW_CLEAR_STATE,
  VIEW_SET_ADD,
  VIEW_TOGGLE_CONFIRM,
  VIEW_TOGGLE_SETTINGS
};

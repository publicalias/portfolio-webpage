"use strict";

//global imports

const { deepCopy } = require("utilities");

//view set add

const VIEW_SET_ADD = (state, { add }) => deepCopy(state, { view: { add } });

//view toggle confirm

const VIEW_TOGGLE_CONFIRM = (state) => deepCopy(state, { view: { confirm: !state.view.confirm } });

//view toggle settings

const VIEW_TOGGLE_SETTINGS = (state) => deepCopy(state, { view: { settings: !state.view.settings } });

//exports

module.exports = {
  VIEW_SET_ADD,
  VIEW_TOGGLE_CONFIRM,
  VIEW_TOGGLE_SETTINGS
};

"use strict";

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//view open list

const VIEW_OPEN_LIST = (state) => deepCopy(state, { page: "list" });

//view set add text

const VIEW_SET_ADD_TEXT = (state, { add }) => deepCopy(state, { view: { add } });

//view toggle confirm

const VIEW_TOGGLE_CONFIRM = (state) => deepCopy(state, { view: { confirm: !state.view.confirm } });

//view toggle settings

const VIEW_TOGGLE_SETTINGS = (state) => deepCopy(state, { view: { settings: !state.view.settings } });

//exports

module.exports = {
  VIEW_OPEN_LIST,
  VIEW_SET_ADD_TEXT,
  VIEW_TOGGLE_CONFIRM,
  VIEW_TOGGLE_SETTINGS
};

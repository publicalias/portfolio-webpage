"use strict";

//local imports

const { newState } = require("../../../../../schemas");

//global imports

const { deepCopy } = require("all/utilities");

//view clear state

const VIEW_CLEAR_STATE = (state) => deepCopy(state, { view: newState().view });

//view set add

const VIEW_SET_ADD = (state, { add }) => deepCopy(state, { view: { body: { add } } });

//view toggle delete

const VIEW_TOGGLE_DELETE = (state) => deepCopy(state, { view: { menu: { delete: !state.view.menu.delete } } });

//view toggle settings

const VIEW_TOGGLE_SETTINGS = (state) => deepCopy(state, {
  view: {
    menu: {
      settings: !state.view.menu.settings,
      delete: false
    }
  }
});

//exports

module.exports = {
  VIEW_CLEAR_STATE,
  VIEW_SET_ADD,
  VIEW_TOGGLE_DELETE,
  VIEW_TOGGLE_SETTINGS
};

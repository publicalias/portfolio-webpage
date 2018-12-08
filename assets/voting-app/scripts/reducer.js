"use strict";

//global imports

const { deepMerge } = require("utilities");

//initial state

const initialState = {
  user: {},
  page: "list",
  list: {
    filter: "all",
    search: "",
    sort: "new",
    polls: [{}]
  },
  form: {
    title: "",
    options: [{
      text: "",
      voted: [""]
    }],
    add: "",
    private: false,
    confirm: false
  },
  view: {
    poll: {},
    add: "",
    settings: false,
    confirm: false
  }
};

//reducer

const MENU_OPEN_FORM = (state) => deepMerge({}, state, { page: "form" });

const META_SET_STATE = (state, { merge }) => deepMerge({}, state, merge);

const reducer = (state = initialState, action) => {

  const actions = {
    MENU_OPEN_FORM,
    META_SET_STATE
  };

  const valid = action && actions[action.type];

  return valid ? valid(state, action) : state;

};

//exports

module.exports = {
  initialState,
  reducer
};

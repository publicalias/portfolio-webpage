"use strict";

//global imports

const { deepMerge } = require("utilities");

//initial state

const initialState = {
  user: {},
  page: "list",
  list: {
    filter: "all-polls",
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

//actions

const META_SET_STATE = (state, action) => deepMerge({}, state, action.data);

//reducer

const reducer = (state = initialState, action) => {

  const actions = { META_SET_STATE };

  const valid = action && actions[action.type];

  return valid ? valid(state, action) : state;

};

//exports

module.exports = {
  initialState,
  reducer
};

"use strict";

//initial state

const initialState = {
  user: {},
  page: "list",
  list: {
    filter: "all",
    search: "",
    sort: "new",
    polls: []
  },
  form: {
    title: "",
    options: [],
    add: "",
    private: false,
    confirm: false
  },
  view: {
    poll: {},
    add: "",
    settings: false,
    confirm: false
  },
  errors: []
};

//exports

module.exports = initialState;

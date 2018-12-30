"use strict";

//initial state

const initialState = {
  user: {},
  polls: [],
  page: "list",
  list: {
    filter: "all",
    search: "",
    searched: "",
    sort: "new"
  },
  form: {
    title: "",
    options: [],
    add: "",
    private: false,
    confirm: false
  },
  view: {
    poll: "",
    add: "",
    settings: false,
    confirm: false
  },
  errors: []
};

//exports

module.exports = { initialState };

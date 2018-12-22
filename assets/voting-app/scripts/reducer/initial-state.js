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
    sort: "new",
    results: [],
    loaded: []
  },
  form: {
    title: "",
    options: [],
    add: "",
    confirmed: false,
    private: false
  },
  view: {
    poll: {},
    add: "",
    confirmed: false,
    settings: false
  },
  errors: []
};

//exports

module.exports = { initialState };

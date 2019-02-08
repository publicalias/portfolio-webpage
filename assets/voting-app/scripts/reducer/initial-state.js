"use strict";

//initial state

const initialState = {
  user: {},
  polls: [],
  page: "list",
  menu: { confirm: false },
  list: {
    filter: "all",
    search: "",
    searched: "",
    sort: "new",
    index: 0
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

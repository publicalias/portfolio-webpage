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
    options: [{
      text: "",
      voted: []
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

//exports

module.exports = initialState;

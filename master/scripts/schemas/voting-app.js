"use strict";

//local imports

const { initSchema, newError } = require("./master");

//new option

const newOption = initSchema({
  text: "",
  created: "",
  voted: []
});

//new poll

const newPoll = initSchema({
  title: "",
  author: "",
  id: "",
  date: 0,
  secret: false,
  users: {
    created: "",
    voted: 0,
    hidden: [],
    flagged: []
  },
  options: []
}, {
  options(val) {
    return val.map(newOption);
  }
});

//new state

const newState = initSchema({
  user: {},
  polls: [],
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
    secret: false,
    confirm: false
  },
  view: {
    add: "",
    settings: false,
    confirm: false
  },
  errors: [],
  loading: false
}, {
  errors(val) {
    return val.map(newError);
  }
});

//exports

module.exports = {
  newOption,
  newPoll,
  newState
};

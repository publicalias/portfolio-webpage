"use strict";

//local imports

const { newSchema } = require("../utilities"); //necessary

//new error

const newError = newSchema({
  text: "",
  timer: 1000
});

//new option

const newOption = newSchema({
  text: "",
  created: "",
  voted: []
});

//new poll

const newPoll = newSchema({
  title: "",
  author: "",
  id: "",
  date: 0,
  private: false,
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

const newState = newSchema({
  user: {},
  polls: [],
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
    add: "",
    settings: false,
    confirm: false
  },
  errors: []
}, {
  errors(val) {
    return val.map(newError);
  }
});

//exports

module.exports = {
  newError,
  newOption,
  newPoll,
  newState
};

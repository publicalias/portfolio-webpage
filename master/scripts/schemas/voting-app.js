"use strict";

//local imports

const { newError } = require("./master");
const { newSchema } = require("../utilities");

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

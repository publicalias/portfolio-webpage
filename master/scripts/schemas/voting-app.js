"use strict";

//local imports

const { initSchema, newError, newIPUser, newUser } = require("./master");

//new option

const newOption = initSchema({
  text: "",
  created: "",
  voted: []
});

//new list params

const newListParams = initSchema({
  filter: "all",
  search: "",
  sort: "new"
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
  list: { search: "" },
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
  loading: 0
}, {

  user(val) {
    switch (val.type) {
      case "ip":
        return newIPUser(val);
      default:
        return newUser(val);
    }
  },

  polls(val) {
    return val.map(newPoll);
  },

  errors(val) {
    return val.map(newError);
  }

});

//new form

const newForm = initSchema(newState().form);

//exports

module.exports = {
  newForm,
  newOption,
  newListParams,
  newPoll,
  newState
};

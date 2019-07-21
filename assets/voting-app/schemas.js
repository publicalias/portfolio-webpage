"use strict";

//global imports

const { initSchema, newError, newIPUser, newUser } = require("schemas"); //isomorphic

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

//new state / new form

const newState = initSchema({

  //meta

  user: {},
  errors: [],
  loading: 0,
  meta: { delete: false },

  polls: [],

  //page

  list: { search: "" },

  form: {
    title: "",
    options: [],
    add: "",
    secret: false,
    delete: false
  },

  view: {
    add: "",
    settings: false,
    delete: false
  }

}, {

  user(val) {
    switch (val.type) {
      case "auth":
        return newUser(val);
      case "ip":
        return newIPUser(val);
      default:
        return {};
    }
  },

  errors(val) {
    return val.map(newError);
  },

  polls(val) {
    return val.map(newPoll);
  }

});

const newForm = initSchema(newState().form);

//exports

module.exports = {
  newForm,
  newOption,
  newListParams,
  newPoll,
  newState
};

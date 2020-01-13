"use strict";

//global imports

const { initSchema, listReplacer, newError, newIPUser, newUser } = require("redux/schemas");

//new form data

const newFormData = initSchema({
  secret: false,
  title: "",
  options: []
});

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
  votes: 0, //computed
  secret: false,
  users: {
    created: "",
    hidden: [],
    flagged: []
  },
  options: []
}, {
  options: listReplacer(newOption)
});

//new state

const newState = initSchema({

  //meta

  user: {},
  account: { delete: false },
  errors: [],
  loading: 0,

  log: [],

  //page

  form: {
    menu: {
      secret: false,
      delete: false
    },
    body: {
      title: "",
      options: [],
      add: ""
    }
  },

  list: {
    data: [],
    menu: { search: "" }
  },

  view: {
    data: [],
    menu: {
      settings: false,
      delete: false
    },
    body: { add: "" }
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

  errors: listReplacer(newError),

  list: { data: listReplacer(newPoll) },
  view: { data: listReplacer(newPoll) }

});

//exports

module.exports = {
  newFormData,
  newOption,
  newListParams,
  newPoll,
  newState
};

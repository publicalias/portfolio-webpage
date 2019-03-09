"use strict";

//global imports

const { mockData } = require("test-helpers/mocks");
const { deepCopy } = require("utilities");

//mock poll

const mockPoll = mockData({
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
    return val.map((e) => deepCopy({
      text: "",
      created: "",
      voted: []
    }, e));
  }
});

//exports

module.exports = { mockPoll };

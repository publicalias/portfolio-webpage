"use strict";

//global imports

const { mockData } = require("test-helpers/mocks");

//mock list

const mockList = mockData({
  filter: "all",
  search: "",
  searched: "",
  sort: "new",
  index: 0
});

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
}, [{
  key: "options",
  val: {
    text: "",
    created: "",
    voted: []
  }
}]);

//exports

module.exports = {
  mockList,
  mockPoll
};

"use strict";

//global imports

const { deepCopy } = require("utilities");

//list set index

const LIST_SET_INDEX = (state, { index }) => deepCopy(state, { list: { index } });

//list set search

const LIST_SET_SEARCH = (state, { search }) => deepCopy(state, { list: { search } });

//list set sort

const LIST_SET_SORT = (state, { sort }) => deepCopy(state, {
  list: {
    sort,
    index: 0
  }
});

//list submit search

const LIST_SUBMIT_SEARCH = (state) => deepCopy(state, {
  list: {
    search: "",
    searched: state.list.search,
    index: 0
  }
});

//exports

module.exports = {
  LIST_SET_INDEX,
  LIST_SET_SEARCH,
  LIST_SET_SORT,
  LIST_SUBMIT_SEARCH
};

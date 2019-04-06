"use strict";

//local imports

const { initialState } = require("../initial-state");

//global imports

const { deepCopy } = require("utilities");

//list open view

const LIST_OPEN_VIEW = (state, { id }) => deepCopy(state, {
  page: "view",
  view: deepCopy(initialState.view, { poll: id })
});

//list set index

const LIST_SET_INDEX = (state, { index }) => deepCopy(state, { list: { index } });

//list set search text

const LIST_SET_SEARCH_TEXT = (state, { search }) => deepCopy(state, { list: { search } });

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
  LIST_OPEN_VIEW,
  LIST_SET_INDEX,
  LIST_SET_SEARCH_TEXT,
  LIST_SET_SORT,
  LIST_SUBMIT_SEARCH
};

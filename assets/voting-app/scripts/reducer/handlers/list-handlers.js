"use strict";

//local imports

const { initialState } = require("../initial-state");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//list open view

const LIST_OPEN_VIEW = (state, { id }) => deepCopy(state, {
  page: "view",
  view: deepCopy(initialState.view, { poll: id })
});

//list set search text

const LIST_SET_SEARCH_TEXT = (state, { search }) => deepCopy(state, { list: { search } });

//list set sort

const LIST_SET_SORT = (state, { sort }) => deepCopy(state, { list: { sort } });

//exports

module.exports = {
  LIST_OPEN_VIEW,
  LIST_SET_SEARCH_TEXT,
  LIST_SET_SORT
};

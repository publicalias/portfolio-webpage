"use strict";

//list open view

const listOpenView = (id) => ({
  type: "LIST_OPEN_VIEW",
  id
});

//list set index

const listSetIndex = (index) => ({
  type: "LIST_SET_INDEX",
  index
});

//list set search text

const listSetSearchText = (search) => ({
  type: "LIST_SET_SEARCH_TEXT",
  search
});

//list set sort

const listSetSort = (sort) => ({
  type: "LIST_SET_SORT",
  sort
});

//list submit search

const listSubmitSearch = () => ({ type: "LIST_SUBMIT_SEARCH" });

//exports

module.exports = {
  listOpenView,
  listSetIndex,
  listSetSearchText,
  listSetSort,
  listSubmitSearch
};

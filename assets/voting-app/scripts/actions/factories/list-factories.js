"use strict";

//list get results

const listGetResults = () => ({ type: "LIST_GET_RESULTS" });

//list load polls

const listLoadPolls = (load) => ({
  type: "LIST_LOAD_POLLS",
  load
});

//list open view

const listOpenView = (index) => ({
  type: "LIST_OPEN_VIEW",
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

//exports

module.exports = {
  listGetResults,
  listLoadPolls,
  listOpenView,
  listSetSearchText,
  listSetSort
};

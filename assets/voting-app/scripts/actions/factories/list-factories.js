"use strict";

//list open view

const listOpenView = (id) => ({
  type: "LIST_OPEN_VIEW",
  id
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
  listOpenView,
  listSetSearchText,
  listSetSort
};

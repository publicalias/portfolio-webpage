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

//list set length

const listSetLength = (length) => ({
  type: "LIST_SET_LENGTH",
  length
});

//list set search text

const listSetSearchText = (search) => ({
  type: "LIST_SET_SEARCH_TEXT",
  search
});

//exports

module.exports = {
  listOpenView,
  listSetIndex,
  listSetLength,
  listSetSearchText
};

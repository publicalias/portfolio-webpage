"use strict";

//list clear state

const listClearState = () => ({ type: "LIST_CLEAR_STATE" });

//list set search

const listSetSearch = (search) => ({
  type: "LIST_SET_SEARCH",
  search
});

//exports

module.exports = {
  listClearState,
  listSetSearch
};

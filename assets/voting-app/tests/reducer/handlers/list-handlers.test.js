"use strict";

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState } = require("../../../scripts/reducer/reducer");
const { testReducer } = require("../../test-helpers");

//global imports

const { deepCopy } = require("utilities");

//list open view

test("reducer accepts LIST_OPEN_VIEW actions", () => {

  const { listOpenView } = actions;

  testReducer(listOpenView("id-a"), {}, {
    page: "view",
    view: deepCopy(initialState.view, { poll: "id-a" })
  });

});

//list set index

test("reducer accepts LIST_SET_INDEX actions", () => {

  const { listSetIndex } = actions;

  testReducer(listSetIndex(1), {}, { list: { index: 1 } });

});

//list set search

test("reducer accepts LIST_SET_SEARCH_TEXT actions", () => {

  const { listSetSearchText } = actions;

  testReducer(listSetSearchText("Apple"), {}, { list: { search: "Apple" } });

});

//list set sort

test("reducer accepts LIST_SET_SORT actions", () => {

  const { listSetSort } = actions;

  testReducer(listSetSort("popular"), {}, { list: { sort: "popular" } });

});

//list submit search

test("reducer accepts LIST_SUBMIT_SEARCH actions", () => {

  const { listSubmitSearch } = actions;

  testReducer(listSubmitSearch(), {
    list: {
      search: "Apple",
      index: 1
    }
  }, {
    list: {
      search: "",
      searched: "Apple",
      index: 0
    }
  });

});

"use strict";

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState, reducer } = require("../../../scripts/reducer/reducer");

//global imports

const { deepCopy } = require("utilities");

//list open view

test("reducer accepts LIST_OPEN_VIEW actions", () => {

  const { listOpenView } = actions;

  const nextState = deepCopy(initialState, {
    page: "view",
    view: deepCopy(initialState.view, { poll: "id-a" })
  });

  expect(reducer(initialState, listOpenView("id-a"))).toEqual(nextState);

});

//list set index

test("reducer accepts LIST_SET_INDEX actions", () => {

  const { listSetIndex } = actions;

  const nextState = deepCopy(initialState, { list: { index: 1 } });

  expect(reducer(initialState, listSetIndex(1))).toEqual(nextState);

});

//list set search

test("reducer accepts LIST_SET_SEARCH_TEXT actions", () => {

  const { listSetSearchText } = actions;

  const nextState = deepCopy(initialState, { list: { search: "Apple" } });

  expect(reducer(initialState, listSetSearchText("Apple"))).toEqual(nextState);

});

//list set sort

test("reducer accepts LIST_SET_SORT actions", () => {

  const { listSetSort } = actions;

  const nextState = deepCopy(initialState, { list: { sort: "popular" } });

  expect(reducer(initialState, listSetSort("popular"))).toEqual(nextState);

});

//list submit search

test("reducer accepts LIST_SUBMIT_SEARCH actions", () => {

  const { listSubmitSearch } = actions;

  const lastState = deepCopy(initialState, {
    list: {
      search: "Apple",
      index: 1
    }
  });

  const nextState = deepCopy(lastState, {
    list: {
      search: "",
      searched: "Apple",
      index: 0
    }
  });

  expect(reducer(lastState, listSubmitSearch())).toEqual(nextState);

});

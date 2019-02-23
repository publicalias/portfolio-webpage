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

  const nextState = deepCopy(initialState, { list: { search: "a" } });

  expect(reducer(initialState, listSetSearchText("a"))).toEqual(nextState);

});

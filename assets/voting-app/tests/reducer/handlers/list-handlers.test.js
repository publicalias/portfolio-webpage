"use strict";

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState, reducer } = require("../../../scripts/reducer/reducer");

//global imports

const { deepCopy } = require("utilities");

//list open view

test("reducer accepts LIST_OPEN_VIEW actions", () => {

  const { listOpenView } = actions;

  const poll = "id-a";

  const nextState = deepCopy(initialState, {
    page: "view",
    view: deepCopy(initialState.view, { poll })
  });

  expect(reducer(initialState, listOpenView(poll))).toEqual(nextState);

});

//list set index

test("reducer accepts LIST_SET_INDEX actions", () => {

  const { listSetIndex } = actions;

  const index = 1;

  const nextState = deepCopy(initialState, { list: { index } });

  expect(reducer(initialState, listSetIndex(index))).toEqual(nextState);

});

//list set length

test("reducer accepts LIST_SET_LENGTH actions", () => {

  const { listSetLength } = actions;

  const length = 1;

  const nextState = deepCopy(initialState, { list: { length } });

  expect(reducer(initialState, listSetLength(length))).toEqual(nextState);

});

//list set search

test("reducer accepts LIST_SET_SEARCH_TEXT actions", () => {

  const { listSetSearchText } = actions;

  const search = "a";

  const nextState = deepCopy(initialState, { list: { search } });

  expect(reducer(initialState, listSetSearchText(search))).toEqual(nextState);

});

"use strict";

/*eslint max-nested-callbacks:0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState, reducer } = require("../../../scripts/reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//reducer

test("reducer accepts LIST_OPEN_VIEW actions", () => {

  const { listOpenView } = actions;

  const poll = "id-a";

  const nextState = deepCopy(initialState, {
    page: "view",
    view: deepCopy(initialState.view, { poll })
  });

  expect(reducer(initialState, listOpenView(poll))).toEqual(nextState);

});

test("reducer accepts LIST_SET_SEARCH_TEXT actions", () => {

  const { listSetSearchText } = actions;

  const search = "a";

  const nextState = deepCopy(initialState, { list: { search } });

  expect(reducer(initialState, listSetSearchText(search))).toEqual(nextState);

});

test("reducer accepts LIST_SET_SORT actions", () => {

  const { listSetSort } = actions;

  const sort = "popular";

  const nextState = deepCopy(initialState, { list: { sort } });

  expect(reducer(initialState, listSetSort(sort))).toEqual(nextState);

});
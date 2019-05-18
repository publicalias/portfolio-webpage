"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");

//list set index

test("listSetIndex creates LIST_SET_INDEX actions", () => {

  const { listSetIndex } = actions;

  expect(listSetIndex(0)).toEqual({
    type: "LIST_SET_INDEX",
    index: 0
  });

});

//list set search

test("listSetSearch creates LIST_SET_SEARCH actions", () => {

  const { listSetSearch } = actions;

  expect(listSetSearch("")).toEqual({
    type: "LIST_SET_SEARCH",
    search: ""
  });

});

//list set sort

test("listSetSort creates LIST_SET_SORT actions", () => {

  const { listSetSort } = actions;

  expect(listSetSort("")).toEqual({
    type: "LIST_SET_SORT",
    sort: ""
  });

});

//list submit search

test("listSubmitSearch creates LIST_SUBMIT_SEARCH actions", () => {

  const { listSubmitSearch } = actions;

  expect(listSubmitSearch()).toEqual({ type: "LIST_SUBMIT_SEARCH" });

});

"use strict";

//local imports

const { actions } = require("../../../scripts/actions/actions");

//list get results

test("listGetResults creates LIST_GET_RESULTS actions", () => {

  const { listGetResults } = actions;

  expect(listGetResults()).toEqual({ type: "LIST_GET_RESULTS" });

});

//list load polls

test("listLoadPolls creates LIST_LOAD_POLLS actions", () => {

  const { listLoadPolls } = actions;

  expect(listLoadPolls(1)).toEqual({
    type: "LIST_LOAD_POLLS",
    load: 1
  });

});

//list open view

test("listOpenView creates LIST_OPEN_VIEW actions", () => {

  const { listOpenView } = actions;

  expect(listOpenView(0)).toEqual({
    type: "LIST_OPEN_VIEW",
    index: 0
  });

});

//list set search text

test("listSetSearchText creates LIST_SET_SEARCH_TEXT actions", () => {

  const { listSetSearchText } = actions;

  expect(listSetSearchText("a")).toEqual({
    type: "LIST_SET_SEARCH_TEXT",
    search: "a"
  });

});

//list set sort

test("listSetSort creates LIST_SET_SORT actions", () => {

  const { listSetSort } = actions;

  expect(listSetSort("popular")).toEqual({
    type: "LIST_SET_SORT",
    sort: "popular"
  });

});

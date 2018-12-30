"use strict";

//local imports

const { actions } = require("../../../scripts/actions/actions");

//list open view

test("listOpenView creates LIST_OPEN_VIEW actions", () => {

  const { listOpenView } = actions;

  expect(listOpenView("")).toEqual({
    type: "LIST_OPEN_VIEW",
    id: ""
  });

});

//list set search text

test("listSetSearchText creates LIST_SET_SEARCH_TEXT actions", () => {

  const { listSetSearchText } = actions;

  expect(listSetSearchText("")).toEqual({
    type: "LIST_SET_SEARCH_TEXT",
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

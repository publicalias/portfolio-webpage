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

//list set index

test("listSetIndex creates LIST_SET_INDEX actions", () => {

  const { listSetIndex } = actions;

  expect(listSetIndex(0)).toEqual({
    type: "LIST_SET_INDEX",
    index: 0
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

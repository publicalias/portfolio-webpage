"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");

//list clear state

test("listClearState creates LIST_CLEAR_STATE actions", () => {

  const { listClearState } = actions;

  expect(listClearState()).toEqual({ type: "LIST_CLEAR_STATE" });

});

//list set search

test("listSetSearch creates LIST_SET_SEARCH actions", () => {

  const { listSetSearch } = actions;

  expect(listSetSearch("")).toEqual({
    type: "LIST_SET_SEARCH",
    search: ""
  });

});

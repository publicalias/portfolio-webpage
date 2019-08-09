"use strict";

//local imports

const { newState } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//list clear state

test("reducer accepts LIST_CLEAR_STATE actions", () => {

  const { listClearState } = actions;

  testReducer(listClearState(), {
    polls: [{}],
    list: { search: "Apple" }
  }, {
    polls: [],
    list: newState().list
  });

});

//list set search

test("reducer accepts LIST_SET_SEARCH actions", () => {

  const { listSetSearch } = actions;

  testReducer(listSetSearch("Apple"), null, { list: { search: "Apple" } });

});

"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//global imports

const { newState } = require("schemas/voting-app");

//list clear state

test("reducer accepts LIST_CLEAR_STATE actions", () => {

  const { listClearState } = actions;

  testReducer(listClearState(), { list: { search: "Apple" } }, { list: newState().list });

});

//list set search

test("reducer accepts LIST_SET_SEARCH actions", () => {

  const { listSetSearch } = actions;

  testReducer(listSetSearch("Apple"), {}, { list: { search: "Apple" } });

});

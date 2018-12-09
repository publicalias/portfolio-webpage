"use strict";

//local imports

const actions = require("../../scripts/actions/actions");
const { initialState, reducer } = require("../../scripts/reducer/reducer");

//global imports

const { deepMerge } = require("utilities");

//reducer

test("reducer accepts META_SET_STATE actions", () => {

  const { metaSetState } = actions;

  const merge = { list: { polls: [{ title: "" }] } };
  const nextState = deepMerge({}, initialState, merge);

  expect(reducer(initialState, metaSetState(merge))).toEqual(nextState);

});

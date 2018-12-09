"use strict";

//local imports

const { metaSetState } = require("../../scripts/action-creators/action-creators");
const { initialState, reducer } = require("../../scripts/reducer/reducer");

//global imports

const { deepMerge } = require("utilities");

//reducer

test("reducer accepts META_SET_STATE actions", () => {

  const merge = { list: { polls: [{ title: "" }] } };
  const nextState = deepMerge({}, initialState, merge);

  expect(reducer(initialState, metaSetState(merge))).toEqual(nextState);

});

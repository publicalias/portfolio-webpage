"use strict";

//local imports

const actions = require("../../scripts/actions/actions");
const { initialState, reducer } = require("../../scripts/reducer/reducer");

//global imports

const { deepCopy } = require("utilities");

//reducer

test("reducer accepts META_SET_STATE actions", () => {

  const { metaSetState } = actions;

  const merge = { list: { polls: [{ title: "" }] } };
  const nextState = deepCopy({}, initialState, merge);

  expect(reducer(initialState, metaSetState(merge))).toEqual(nextState);

});

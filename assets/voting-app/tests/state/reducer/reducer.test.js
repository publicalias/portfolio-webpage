"use strict";

//local imports

const { actions } = require("../../../scripts/state/actions/actions");
const { initialState, reducer } = require("../../../scripts/state/reducer/reducer");
const { testReducer } = require("../../test-helpers");

//reducer

test("reducer initializes the state", () => {
  expect(reducer()).toEqual(initialState);
});

test("reducer defaults to the last state", () => {

  const { metaNoOp } = actions;

  testReducer(metaNoOp(), {}, {});

});

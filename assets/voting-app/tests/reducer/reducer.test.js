"use strict";

//local imports

const { initialState, reducer } = require("../../scripts/reducer/reducer");

//reducer

test("reducer initializes the state", () => {
  expect(reducer()).toEqual(initialState);
});

test("reducer defaults to the last state", () => {

  const action = { type: "INVALID" };

  expect(reducer(initialState, action)).toEqual(initialState);

});

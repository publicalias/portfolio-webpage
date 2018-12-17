"use strict";

//local imports

const { initialState, reducer } = require("../../scripts/reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//reducer

test("reducer initializes the state", () => {
  expect(reducer()).toEqual(initialState);
});

test("reducer defaults to the last state", () => {

  const lastState = deepCopy(initialState, { page: "form" });

  const action = { type: "INVALID" };

  expect(reducer(lastState, action)).toEqual(lastState);

});

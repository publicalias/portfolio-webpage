"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { reducer } = require("../scripts/reducer");

//tests

describe("reducer", () => {

  const initialState = { counter: 0 };

  const ADD = { type: "ADD" };
  const INVALID = { type: "INVALID" };

  it("initializes the state", () => {
    expect(reducer()).toEqual(initialState);
  });

  it("defaults to the old state", () => {
    expect(reducer(initialState, INVALID)).toEqual(initialState);
  });

  it("accepts ADD actions", () => {
    expect(reducer(initialState, ADD)).toEqual({ counter: 1 });
  });

});

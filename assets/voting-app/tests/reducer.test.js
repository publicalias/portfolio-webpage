"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { metaSetState } = require("../scripts/action-creators");
const { initialState, reducer } = require("../scripts/reducer");

//global imports

const { deepMerge } = require("utilities");

//tests

describe("reducer", () => {

  it("initializes the state", () => {
    expect(reducer()).toEqual(initialState);
  });

  it("defaults to the last state", () => {

    const lastState = deepMerge({}, initialState, { page: "form" });
    const action = { type: "INVALID" };

    expect(reducer(lastState, action)).toEqual(lastState);

  });

  it("accepts META_SET_STATE actions", () => {

    const merge = { list: { polls: [{ title: "" }] } };
    const nextState = deepMerge({}, initialState, merge);

    expect(reducer(initialState, metaSetState(merge))).toEqual(nextState);

  });

});

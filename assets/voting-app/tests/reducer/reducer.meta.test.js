"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const actions = require("../../scripts/actions/actions");
const { initialState, reducer } = require("../../scripts/reducer/reducer");

//global imports

const { deepCopy } = require("utilities");

//reducer

describe("reducer", () => {

  it("accepts META_SET_STATE actions", () => {

    const { metaSetState } = actions;

    const merge = { user: { name: "" } };

    const nextState = deepCopy(initialState, merge);

    expect(reducer(initialState, metaSetState(merge))).toEqual(nextState);

  });

  it("accepts META_SET_STATE actions with options", () => {

    const { metaSetState } = actions;

    const merge = { user: {} };

    const lastState = deepCopy(initialState, { user: { name: "" } });
    const nextState = deepCopy(initialState, merge);

    expect(reducer(lastState, metaSetState(merge, { shallow: true }))).toEqual(nextState);

  });

});

"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState, reducer } = require("../../../scripts/reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//reducer

test("reducer accepts META_ADD_ERRORS actions", () => {

  const { metaAddErrors } = actions;

  const text = "Error B";

  const errorA = {
    text: "Error A",
    timer: 100
  };
  const errorB = {
    text,
    timer: 1000
  };

  const lastState = deepCopy(initialState, { errors: [errorA] });
  const nextState = deepCopy(lastState, { errors: [errorA, errorB] });

  expect(reducer(lastState, metaAddErrors([text]))).toEqual(nextState);

});

test("reducer accepts META_CLOSE_ERROR actions", () => {

  const { metaCloseError } = actions;

  const errorA = { text: "Error A" };
  const errorB = { text: "Error B" };

  const lastState = deepCopy(initialState, { errors: [errorA, errorB] });
  const nextState = deepCopy(lastState, { errors: [errorA] });

  expect(reducer(lastState, metaCloseError(1))).toEqual(nextState);

});

describe("reducer", () => {

  const { metaSetState } = actions;

  it("accepts META_SET_STATE actions", () => {

    const merge = { user: { id: "id-a" } };

    const nextState = deepCopy(initialState, merge);

    expect(reducer(initialState, metaSetState(merge))).toEqual(nextState);

  });

  it("accepts META_SET_STATE actions with config", () => {

    const merge = { user: {} };

    const lastState = deepCopy(initialState, { user: { id: "id-a" } });
    const nextState = initDeepCopy({ object: true })(lastState, merge);

    expect(reducer(lastState, metaSetState(merge, { object: true }))).toEqual(nextState);

  });

});

test("reducer accepts META_TIMEOUT_ERROR actions", () => {

  const { metaTimeoutError } = actions;

  const errorA = { timer: 100 };
  const errorB = { timer: 1000 };
  const errorC = { timer: 900 };

  const lastState = deepCopy(initialState, { errors: [errorA, errorB] });
  const nextState = deepCopy(lastState, { errors: [errorC] });

  expect(reducer(lastState, metaTimeoutError())).toEqual(nextState);

});

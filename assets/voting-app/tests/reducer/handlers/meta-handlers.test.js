"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState, reducer } = require("../../../scripts/reducer/reducer");

//global imports

const { deepCopy, initDeepCopy } = require("utilities");

//reducer

test("reducer accepts META_ADD_ERRORS actions", () => {

  const { metaAddErrors } = actions;

  const error = {
    text: "",
    timer: 1000
  };

  const lastState = deepCopy(initialState, { errors: [error] });
  const nextState = deepCopy(lastState, { errors: [error, error] });

  expect(reducer(lastState, metaAddErrors([""]))).toEqual(nextState);

});

test("reducer accepts META_CLOSE_ERROR actions", () => {

  const { metaCloseError } = actions;

  const lastState = deepCopy(initialState, { errors: [{}, {}] });
  const nextState = deepCopy(lastState, { errors: [{}] });

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
    const config = { object: true };

    const lastState = deepCopy(initialState, { user: { id: "id-a" } });
    const nextState = initDeepCopy(config)(lastState, merge);

    expect(reducer(lastState, metaSetState(merge, config))).toEqual(nextState);

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

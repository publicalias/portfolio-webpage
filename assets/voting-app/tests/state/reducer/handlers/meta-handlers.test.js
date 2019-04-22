"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { reducer } = require("../../../../scripts/state/reducer/reducer");
const { testReducer } = require("../../../test-helpers");

//global imports

const { newError, newState } = require("schemas/voting-app");
const { deepCopy, initDeepCopy } = require("utilities");

//meta add errors

test("reducer accepts META_ADD_ERRORS actions", () => {

  const { metaAddErrors } = actions;

  testReducer(metaAddErrors([""]), { errors: [{}] }, { errors: [{}, newError()] });

});

//meta close error

test("reducer accepts META_CLOSE_ERROR actions", () => {

  const { metaCloseError } = actions;

  testReducer(metaCloseError(1), { errors: [{}, {}] }, { errors: [{}] });

});

//meta set state

describe("reducer", () => {

  const { metaSetState } = actions;

  const getUser = (bool) => ({ user: bool ? { id: "id-a" } : {} });

  it("accepts META_SET_STATE actions", () => {

    const next = getUser(true);

    testReducer(metaSetState(next), {}, next);

  });

  it("accepts META_SET_STATE actions with config", () => {

    const config = { object: true };

    const last = getUser(true);
    const next = getUser();

    const lastState = deepCopy(newState(), last);
    const nextState = initDeepCopy(config)(lastState, next);

    expect(reducer(lastState, metaSetState(next, config))).toEqual(nextState);

  });

});

//meta timeout error

test("reducer accepts META_TIMEOUT_ERROR actions", () => {

  const { metaTimeoutError } = actions;

  const last = [{ timer: 100 }, { timer: 1000 }];
  const next = [{ timer: 900 }];

  testReducer(metaTimeoutError(), { errors: last }, { errors: next });

});

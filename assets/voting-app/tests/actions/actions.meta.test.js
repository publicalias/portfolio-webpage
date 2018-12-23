"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../scripts/actions/actions");
const { initialState } = require("../../scripts/reducer/reducer");

//node modules

const configureStore = require("redux-mock-store").default;
const ReduxThunk = require("redux-thunk").default;

//setup

const middleware = [ReduxThunk];
const mockStore = configureStore(middleware);

//meta add error

test("metaAddErrors creates META_ADD_ERRORS actions", () => {

  const { metaAddErrors } = actions;

  const errors = ["500 Internal Server Error"];

  expect(metaAddErrors(errors)).toEqual({
    type: "META_ADD_ERRORS",
    errors
  });

});

//meta close error

test("metaCloseError creates META_CLOSE_ERROR actions", () => {

  const { metaCloseError } = actions;

  expect(metaCloseError(0)).toEqual({
    type: "META_CLOSE_ERROR",
    index: 0
  });

});

//meta get polls

describe("metaGetPolls", () => {

  const { metaGetPolls, metaAddErrors, metaSetState } = actions;

  afterAll(() => {
    global.fetch = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const res = { polls: [{ id: "id-a" }] };

    const store = mockStore(initialState);
    const actionList = [metaSetState(res)];

    const fetch = () => Promise.resolve({
      ok: true,
      json() {
        return res;
      }
    });

    global.fetch = jest.fn(fetch);

    return store.dispatch(metaGetPolls()).then(() => {
      expect(store.getActions()).toEqual(actionList);
    });

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => {

    const status = 500;
    const statusText = "Internal Server Error";

    const store = mockStore(initialState);
    const actionList = [metaAddErrors([`${status} ${statusText}`])];

    const fetch = () => Promise.resolve({
      status,
      statusText,
      ok: false
    });

    global.fetch = jest.fn(fetch);

    return store.dispatch(metaGetPolls()).then(() => {
      expect(store.getActions()).toEqual(actionList);
    });

  });

});

//meta set state

describe("metaSetState", () => {

  const { metaSetState } = actions;

  it("creates META_SET_STATE actions", () => {

    const merge = { user: { id: "id-a" } };

    expect(metaSetState(merge)).toEqual({
      type: "META_SET_STATE",
      merge
    });

  });

  it("creates META_SET_STATE actions with config", () => {

    const merge = { user: {} };

    expect(metaSetState(merge, { object: true })).toEqual({
      type: "META_SET_STATE",
      merge,
      config: { object: true }
    });

  });

});

//meta timeout error

test("metaTimeoutError creates META_TIMEOUT_ERROR actions", () => {

  const { metaTimeoutError } = actions;

  expect(metaTimeoutError()).toEqual({ type: "META_TIMEOUT_ERROR" });

});
"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState } = require("../../../scripts/reducer/reducer");

//node modules

const configureStore = require("redux-mock-store").default;
const ReduxThunk = require("redux-thunk").default;

//setup

const middleware = [ReduxThunk];
const mockStore = configureStore(middleware);

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

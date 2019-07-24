"use strict";

//local imports

const { encodeAPICall } = require("../client-utils");
const { testMock } = require("./meta-tests");
const { metaAddErrors, metaNoOp, metaSetLoading, metaSetState } = require("../redux-utils/meta-factories");
const { deepCopy } = require("../utilities");

//node modules

const { default: configureStore } = require("redux-mock-store");
const { default: ReduxThunk } = require("redux-thunk");

//utilities

const mockStore = configureStore([ReduxThunk]);

//init test api

const testAPICall = (args) => {

  const { path, init } = encodeAPICall(args);

  testMock(fetch, [path, init]);

};

const testAPIThunk = async (action, args, actionList, lastState, fetch) => {

  const store = mockStore(lastState);

  const fullList = [metaSetLoading(true), ...actionList, metaSetLoading()];

  global.fetch = jest.fn(fetch);
  global.Headers = jest.fn();

  await store.dispatch(action);

  testAPICall(args);
  expect(store.getActions()).toEqual(fullList);

};

const initTestAPI = (newState) => {

  const testAPI = {

    success(action, args, res, actionList, lastState = newState()) {

      const fetch = () => Promise.resolve({
        ok: true,
        json() {
          return res;
        }
      });

      return testAPIThunk(action, args, actionList, lastState, fetch);

    },

    failure(action, args, lastState = newState()) {

      const status = 500;
      const statusText = "Internal Server Error";

      const actionList = [metaAddErrors([`${status} ${statusText}`])];

      const fetch = () => Promise.resolve({
        ok: false,
        status,
        statusText
      });

      return testAPIThunk(action, args, actionList, lastState, fetch);

    }

  };

  testAPI.default = (action, args) => {

    const success = [
      ["META_SET_STATE", { user: {} }, "res", [metaSetState({ user: {} })]], //order preserves formatting
      ["META_NO_OP", {}, "no res", [metaNoOp()]],
      ["META_ADD_ERRORS", { errors: [] }, "errors", [metaAddErrors([])]]
    ];

    for (const e of success) {

      const [type, res, test, actionList] = e;

      it(`dispatches ${type} action on success (${test})`, () => testAPI.success(action, args, res, actionList));

    }

    it("dispatches META_ADD_ERRORS on failure", () => testAPI.failure(action, args));

  };

  return testAPI;

};

//init test reducer

const initTestReducer = (newState, reducer) => (action, last, next) => {

  const lastState = newState(last);
  const nextState = deepCopy(lastState, newState(next));

  expect(reducer(lastState, action)).toEqual(nextState);

};

//exports

module.exports = {
  initTestAPI,
  initTestReducer
};

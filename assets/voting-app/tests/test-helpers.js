"use strict";

//local imports

const { actions } = require("../scripts/state/actions/actions");
const { initialState, reducer } = require("../scripts/state/reducer/reducer");

//global imports

const { encodeAPICall } = require("client-utils");
const { mockStore } = require("test-helpers/client-tests");
const { deepCopy } = require("utilities");

//utilities

const testAPICall = (args) => {

  const { path, init } = encodeAPICall(args);

  const calls = fetch.mock.calls;

  expect(calls.length).toEqual(1);
  expect(calls[0][0]).toEqual(path);
  expect(calls[0][1]).toEqual(init);

};

const testAPIThunk = (action, args, actionList, lastState, fetch) => {

  const store = mockStore(lastState);

  global.fetch = jest.fn(fetch);
  global.Headers = jest.fn();

  return store.dispatch(action).then(() => {
    testAPICall(args);
    expect(store.getActions()).toEqual(actionList);
  });

};

//test api failure

const testAPIFailure = (action, args, lastState = initialState) => {

  const { metaAddErrors } = actions;

  const status = 500;
  const statusText = "Internal Server Error";

  const actionList = [metaAddErrors([`${status} ${statusText}`])];

  const fetch = () => Promise.resolve({
    ok: false,
    status,
    statusText
  });

  return testAPIThunk(action, args, actionList, lastState, fetch);

};

//test api success

const testAPISuccess = (action, args, res, actionList, lastState = initialState) => {

  const fetch = () => Promise.resolve({
    ok: true,
    json() {
      return res;
    }
  });

  return testAPIThunk(action, args, actionList, lastState, fetch);

};

//test reducer

const testReducer = (action, last, next) => {

  const lastState = deepCopy(initialState, last);
  const nextState = deepCopy(lastState, next);

  expect(reducer(lastState, action)).toEqual(nextState);

};

//test thunk

const testThunk = (action, actionList, lastState = initialState) => {

  const store = mockStore(lastState);

  store.dispatch(action);

  expect(store.getActions()).toEqual(actionList);

};

//exports

module.exports = {
  testAPIFailure,
  testAPISuccess,
  testReducer,
  testThunk
};

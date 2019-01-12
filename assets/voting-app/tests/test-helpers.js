"use strict";

//local imports

const { actions } = require("../scripts/actions/actions");
const { initialState } = require("../scripts/reducer/reducer");

//node modules

const configureStore = require("redux-mock-store").default;
const ReduxThunk = require("redux-thunk").default;

//setup

const middleware = [ReduxThunk];
const mockStore = configureStore(middleware);

//utilities

const testAPIGlobals = (fetch) => {
  global.fetch = jest.fn(fetch);
  global.Headers = jest.fn((init) => init);
};

const testAPICall = ({ path, body }) => {

  const calls = fetch.mock.calls;

  expect(calls.length).toEqual(1);
  expect(calls[0][0]).toEqual(path);
  expect(calls[0][1]).toEqual({
    method: "POST",
    body,
    headers: new Headers({ "Content-Type": "application/json" })
  });

};

//test api failure

const testAPIFailure = (action, args, lastState = initialState) => {

  const { metaAddErrors } = actions;

  const status = 500;
  const statusText = "Internal Server Error";

  const store = mockStore(lastState);
  const actionList = [metaAddErrors([`${status} ${statusText}`])];

  const fetch = () => Promise.resolve({
    status,
    statusText,
    ok: false
  });

  testAPIGlobals(fetch);

  return store.dispatch(action).then(() => {
    testAPICall(args);
    expect(store.getActions()).toEqual(actionList);
  });

};

//test api success

const testAPISuccess = (action, args, res, actionList, lastState = initialState) => {

  const store = mockStore(lastState);

  const fetch = () => Promise.resolve({
    ok: true,
    json() {
      return res;
    }
  });

  testAPIGlobals(fetch);

  return store.dispatch(action).then(() => {
    testAPICall(args);
    expect(store.getActions()).toEqual(actionList);
  });

};

//exports

module.exports = {
  testAPIFailure,
  testAPISuccess
};

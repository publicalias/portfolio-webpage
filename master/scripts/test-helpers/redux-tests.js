"use strict";

//local imports

const { encodeAPICall } = require("../client-utils");
const { metaAddErrors, metaSetLoading } = require("../redux-utils/meta-factories");
const { deepCopy } = require("../utilities");

//node modules

const { default: configureStore } = require("redux-mock-store");
const { default: ReduxThunk } = require("redux-thunk");

//utilities

const mockStore = configureStore([ReduxThunk]);

//init history

const initHistory = () => {

  const history = {};

  const testHistory = (redirects) => {

    const calls = history.push.mock.calls;

    expect(calls.length).toEqual(redirects.length);

    calls.forEach((e, i) => {
      expect(e[0]).toEqual(redirects[i]);
    });

  };

  beforeEach(() => {
    history.push = jest.fn();
  });

  return {
    history,
    testHistory
  };

};

//init test api

const testAPICall = (args) => {

  const { path, init } = encodeAPICall(args);

  const calls = fetch.mock.calls;

  expect(calls.length).toEqual(1);
  expect(calls[0][0]).toEqual(path);
  expect(calls[0][1]).toEqual(init);

};

const testAPIThunk = (action, args, actionList, lastState, fetch) => {

  const store = mockStore(lastState);

  const fullList = [metaSetLoading(true), ...actionList, metaSetLoading()];

  global.fetch = jest.fn(fetch);
  global.Headers = jest.fn();

  return store.dispatch(action).then(() => {
    testAPICall(args);
    expect(store.getActions()).toEqual(fullList);
  });

};

const initTestAPI = (newState) => ({

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

});

//init test reducer

const initTestReducer = (newState, reducer) => (action, last, next) => {

  const lastState = deepCopy(newState(), last);
  const nextState = deepCopy(lastState, next);

  expect(reducer(lastState, action)).toEqual(nextState);

};

//init test thunk

const initTestThunk = (newState) => (action, actionList, lastState = newState()) => {

  const store = mockStore(lastState);

  store.dispatch(action);

  expect(store.getActions()).toEqual(actionList);

};

//exports

module.exports = {
  initHistory,
  initTestAPI,
  initTestReducer,
  initTestThunk
};
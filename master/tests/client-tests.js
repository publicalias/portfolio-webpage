"use strict";

//global imports

const { encodeAPICall } = require("client-utils");
const { deepCopy } = require("utilities");

//node modules

const { configure } = require("enzyme");
const { default: configureStore } = require("redux-mock-store");
const { default: ReduxThunk } = require("redux-thunk");

const Adapter = require("enzyme-adapter-react-16");

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

  global.fetch = jest.fn(fetch);
  global.Headers = jest.fn();

  return store.dispatch(action).then(() => {
    testAPICall(args);
    expect(store.getActions()).toEqual(actionList);
  });

};

const initTestAPI = (getActionList, initialState) => ({

  success(action, args, res, actionList, lastState = initialState) {

    const fetch = () => Promise.resolve({
      ok: true,
      json() {
        return res;
      }
    });

    return testAPIThunk(action, args, actionList, lastState, fetch);

  },

  failure(action, args, lastState = initialState) {

    const status = 500;
    const statusText = "Internal Server Error";

    const actionList = getActionList(`${status} ${statusText}`);

    const fetch = () => Promise.resolve({
      ok: false,
      status,
      statusText
    });

    return testAPIThunk(action, args, actionList, lastState, fetch);

  }

});

//init test reducer

const initTestReducer = (initialState, reducer) => (action, last, next) => {

  const lastState = deepCopy(initialState, last);
  const nextState = deepCopy(lastState, next);

  expect(reducer(lastState, action)).toEqual(nextState);

};

//init test thunk

const initTestThunk = (initialState) => (action, actionList, lastState = initialState) => {

  const store = mockStore(lastState);

  store.dispatch(action);

  expect(store.getActions()).toEqual(actionList);

};

//react tests

const reactTests = {
  setup() {
    configure({ adapter: new Adapter() });
  }
};

//exports

module.exports = {
  initHistory,
  initTestAPI,
  initTestReducer,
  initTestThunk,
  reactTests
};

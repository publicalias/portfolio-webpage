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

//test api failure

const testAPIFailure = (action, state = initialState) => {

  const { metaAddErrors } = actions;

  const status = 500;
  const statusText = "Internal Server Error";

  const store = mockStore(state);
  const actionList = [metaAddErrors([`${status} ${statusText}`])];

  const fetch = () => Promise.resolve({
    status,
    statusText,
    ok: false
  });

  global.fetch = jest.fn(fetch);

  return store.dispatch(action).then(() => {
    expect(store.getActions()).toEqual(actionList);
  });

};

//test api success

const testAPISuccess = (action, res, actionList, state = initialState) => {

  const store = mockStore(state);

  const fetch = () => Promise.resolve({
    ok: true,
    json() {
      return res;
    }
  });

  global.fetch = jest.fn(fetch);

  return store.dispatch(action).then(() => {
    expect(store.getActions()).toEqual(actionList);
  });

};

//exports

module.exports = {
  testAPIFailure,
  testAPISuccess
};

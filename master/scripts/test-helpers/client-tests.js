"use strict";

//node modules

const { configure } = require("enzyme");
const { default: configureStore } = require("redux-mock-store");
const { default: ReduxThunk } = require("redux-thunk");

const Adapter = require("enzyme-adapter-react-16");

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

//mock store

const mockStore = configureStore([ReduxThunk]);

//react tests

const reactTests = {
  setup() {
    configure({ adapter: new Adapter() });
  }
};

//exports

module.exports = {
  initHistory,
  mockStore,
  reactTests
};

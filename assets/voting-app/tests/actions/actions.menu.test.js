"use strict";

//local imports

const actions = require("../../scripts/actions/actions");
const { initialState } = require("../../scripts/reducer/reducer");

//global imports

const { deepCopy } = require("utilities");

//node modules

const configureStore = require("redux-mock-store").default;
const ReduxThunk = require("redux-thunk").default;

//setup

const middleware = [ReduxThunk];
const mockStore = configureStore(middleware);

beforeAll(() => {
  global.Headers = jest.fn((init) => init);
});

afterAll(() => {
  global.fetch = undefined;
  global.Headers = undefined;
});

//menu auth user

test("menuAuthUser dispatches META_SET_STATE on success", () => {

  const { menuAuthUser } = actions;

  const user = { name: "" };
  const auth = {}; //oauth token

  const store = mockStore(initialState);
  const actionList = [{
    type: "META_SET_STATE",
    merge: deepCopy(initialState, { user }),
    options: { shallow: true }
  }];

  const fetch = () => Promise.resolve({
    ok: true,
    json() {
      return { user };
    }
  });

  global.fetch = jest.fn(fetch);

  return store.dispatch(menuAuthUser("auth", auth)).then(() => {
    expect(store.getActions()).toEqual(actionList);
  });

});

test("menuAuthUser dispatches META_SET_STATE on failure", () => {

  const { menuAuthUser } = actions;

  const store = mockStore(initialState);
  const actionList = [{
    type: "META_SET_STATE",
    merge: deepCopy(initialState, { user: {} }),
    options: { shallow: true }
  }];

  const fetch = () => Promise.resolve({
    ok: false,
    statusText: "Not Found"
  });

  global.fetch = jest.fn(fetch);

  return store.dispatch(menuAuthUser("ip")).then(() => {
    expect(store.getActions()).toEqual(actionList);
  });

});

//menu open form

test("menuOpenForm creates MENU_OPEN_FORM actions", () => {

  const { menuOpenForm } = actions;

  expect(menuOpenForm()).toEqual({ type: "MENU_OPEN_FORM" });

});

//menu set filter

test("menuSetFilter creates MENU_SET_FILTER actions", () => {

  const { menuSetFilter } = actions;

  const filter = "voted";

  expect(menuSetFilter(filter)).toEqual({
    type: "MENU_SET_FILTER",
    filter
  });

});

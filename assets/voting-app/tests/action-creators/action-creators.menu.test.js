"use strict";

//local imports

const { menuAuthUser, menuOpenForm, menuSetFilter } = require("../../scripts/action-creators/action-creators");
const { initialState } = require("../../scripts/reducer/reducer");

//global imports

const { deepMerge } = require("utilities");

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

  const user = { name: "" };
  const auth = {}; //oauth token

  const store = mockStore(initialState);
  const actions = [{
    type: "META_SET_STATE",
    merge: deepMerge(initialState, { user })
  }];

  const fetch = () => Promise.resolve({
    ok: true,
    json() {
      return user;
    }
  });

  global.fetch = jest.fn(fetch);

  return store.dispatch(menuAuthUser("auth", auth)).then(() => {
    expect(store.getActions()).toEqual(actions);
  });

});

test("menuAuthUser dispatches META_SET_STATE on failure", () => {

  const store = mockStore(initialState);
  const actions = [{
    type: "META_SET_STATE",
    merge: deepMerge(initialState, { user: {} })
  }];

  const fetch = () => Promise.resolve({
    ok: false,
    statusText: "Not Found"
  });

  global.fetch = jest.fn(fetch);

  return store.dispatch(menuAuthUser("ip")).then(() => {
    expect(store.getActions()).toEqual(actions);
  });

});

//menu open form

test("menuOpenForm creates MENU_OPEN_FORM actions", () => {
  expect(menuOpenForm()).toEqual({ type: "MENU_OPEN_FORM" });
});

//menu set filter

test("menuSetFilter dispatches META_SET_STATE on success", () => {

  const filter = "voted";
  const polls = [{ title: "" }];

  const store = mockStore(initialState);
  const actions = [{
    type: "META_SET_STATE",
    merge: {
      page: "list",
      list: {
        filter,
        search: "",
        sort: "new",
        polls
      }
    }
  }];

  const fetch = () => Promise.resolve({
    ok: true,
    json() {
      return polls;
    }
  });

  global.fetch = jest.fn(fetch);

  return store.dispatch(menuSetFilter(filter)).then(() => {
    expect(store.getActions()).toEqual(actions);
  });

});

test("menuSetFilter dispatches META_SET_STATE on failure", () => {

  const filter = "created";

  const store = mockStore(initialState);
  const actions = [{
    type: "META_SET_STATE",
    merge: {
      page: "list",
      list: {
        filter,
        search: "",
        sort: "new",
        polls: []
      }
    }
  }];

  const fetch = () => Promise.resolve({
    ok: false,
    statusText: "Unauthorized"
  });

  global.fetch = jest.fn(fetch);

  return store.dispatch(menuSetFilter(filter)).then(() => {
    expect(store.getActions()).toEqual(actions);
  });

});

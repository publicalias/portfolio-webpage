"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { menuAuthUser, menuOpenForm, menuSetFilter, metaSetState } = require("../scripts/action-creators");
const { initialState } = require("../scripts/reducer");

//global imports

const { deepMerge } = require("utilities");

//node modules

const configureStore = require("redux-mock-store").default;
const ReduxThunk = require("redux-thunk").default;

//setup

const middleware = [ReduxThunk];
const mockStore = configureStore(middleware);

//tests

describe("menuAuthUser", () => {

  const getActionList = (user) => [{
    type: "META_SET_STATE",
    merge: deepMerge(initialState, { user })
  }];

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE on success", () => {

    const user = { name: "" };
    const auth = {}; //oauth token

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json() {
        return user;
      }
    }));

    const store = mockStore(initialState);
    const actions = getActionList(user);

    return store.dispatch(menuAuthUser("auth", auth)).then(() => {
      expect(store.getActions()).toEqual(actions);
    });

  });

  it("dispatches META_SET_STATE on failure", () => {

    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      statusText: "Not Found"
    }));

    const store = mockStore(initialState);
    const actions = getActionList({});

    return store.dispatch(menuAuthUser("ip")).then(() => {
      expect(store.getActions()).toEqual(actions);
    });

  });

});

describe("menuOpenForm", () => {
  it("creates MENU_OPEN_FORM actions", () => {
    expect(menuOpenForm()).toEqual({ type: "MENU_OPEN_FORM" });
  });
});

describe("menuSetFilter", () => {

  const getActionList = (filter, polls) => [{
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

  afterAll(() => {
    global.fetch = undefined;
  });

  it("dispatches META_SET_STATE on success", () => {

    const polls = [{ title: "" }];

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json() {
        return polls;
      }
    }));

    const store = mockStore(initialState);
    const actions = getActionList("voted", polls);

    return store.dispatch(menuSetFilter("voted")).then(() => {
      expect(store.getActions()).toEqual(actions);
    });

  });

  it("dispatches META_SET_STATE on failure", () => {

    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      statusText: "Unauthorized"
    }));

    const store = mockStore(initialState);
    const actions = getActionList("created", []);

    return store.dispatch(menuSetFilter("created")).then(() => {
      expect(store.getActions()).toEqual(actions);
    });

  });

});

describe("metaSetState", () => {
  it("creates META_SET_STATE actions", () => {

    const merge = { list: { polls: [{ title: "" }] } };

    expect(metaSetState(merge)).toEqual({
      type: "META_SET_STATE",
      merge
    });

  });
});

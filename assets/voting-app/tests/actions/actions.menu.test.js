"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const actions = require("../../scripts/actions/actions");
const { initialState } = require("../../scripts/reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//node modules

const configureStore = require("redux-mock-store").default;
const ReduxThunk = require("redux-thunk").default;

//setup

const middleware = [ReduxThunk];
const mockStore = configureStore(middleware);

//menu auth user

describe("menuAuthUser", () => {

  const getActionList = (res) => {

    const { metaSetState } = actions;

    const merge = deepCopy(initialState, res);

    delete merge.polls;
    delete merge.errors;

    return [metaSetState(merge, { obj: true })];

  };

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const { menuAuthUser } = actions;

    const res = { user: { name: "" } };
    const auth = {}; //oauth token

    const store = mockStore(initialState);
    const actionList = getActionList(res);

    const fetch = () => Promise.resolve({
      ok: true,
      json() {
        return res;
      }
    });

    global.fetch = jest.fn(fetch);

    return store.dispatch(menuAuthUser("auth", auth)).then(() => {
      expect(store.getActions()).toEqual(actionList);
    });

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => {

    const { menuAuthUser, metaAddErrors } = actions;

    const status = 500;
    const statusText = "Internal Server Error";

    const store = mockStore(initialState);
    const actionList = [metaAddErrors([`${status} ${statusText}`])];

    const fetch = () => Promise.resolve({
      status,
      statusText,
      ok: false
    });

    global.fetch = jest.fn(fetch);

    return store.dispatch(menuAuthUser("ip")).then(() => {
      expect(store.getActions()).toEqual(actionList);
    });

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

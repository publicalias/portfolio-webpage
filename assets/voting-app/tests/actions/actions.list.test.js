"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../scripts/actions/actions");
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

//list get results

test("listGetResults creates LIST_GET_RESULTS actions", () => {

  const { listGetResults } = actions;

  expect(listGetResults()).toEqual({ type: "LIST_GET_RESULTS" });

});

//list load polls

test("listLoadPolls creates LIST_LOAD_POLLS actions", () => {

  const { listLoadPolls } = actions;

  expect(listLoadPolls(1)).toEqual({
    type: "LIST_LOAD_POLLS",
    load: 1
  });

});

//list open view

test("listOpenView creates LIST_OPEN_VIEW actions", () => {

  const { listOpenView } = actions;

  expect(listOpenView(0)).toEqual({
    type: "LIST_OPEN_VIEW",
    index: 0
  });

});

//list set search text

test("listSetSearchText creates LIST_SET_SEARCH_TEXT actions", () => {

  const { listSetSearchText } = actions;

  expect(listSetSearchText("a")).toEqual({
    type: "LIST_SET_SEARCH_TEXT",
    search: "a"
  });

});

//list set sort

test("listSetSort creates LIST_SET_SORT actions", () => {

  const { listSetSort } = actions;

  expect(listSetSort("popular")).toEqual({
    type: "LIST_SET_SORT",
    sort: "popular"
  });

});

describe("listSubmitSearch", () => {

  const { listSubmitSearch, metaAddErrors, metaSetState } = actions;

  const getLastState = (search) => deepCopy(initialState, { list: { search } });

  it("dispatches META_ADD_ERRORS actions with empty input", () => {

    const lastState = getLastState("");

    const store = mockStore(lastState);
    const actionList = [metaAddErrors(["Nothing will come of nothing"])];

    store.dispatch(listSubmitSearch());

    expect(store.getActions()).toEqual(actionList);

  });

  it("dispatches META_SET_STATE actions with valid input", () => {

    const lastState = getLastState("a");

    const store = mockStore(lastState);
    const actionList = [metaSetState({
      list: {
        search: "",
        searched: "a"
      }
    })];

    store.dispatch(listSubmitSearch());

    expect(store.getActions()).toEqual(actionList);

  });

});

//list toggle flag

describe("listToggleFlag", () => {

  const { listToggleFlag, metaAddErrors, metaSetState } = actions;

  const getLastState = () => deepCopy(initialState, {
    user: { id: "id-a" },
    list: { loaded: [{ id: "id-b" }] }
  });

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const res = { polls: [{ users: { flagged: ["id-a"] } }] };

    const store = mockStore(getLastState());
    const actionList = [metaSetState(res)];

    const fetch = () => Promise.resolve({
      ok: true,
      json() {
        return res;
      }
    });

    global.fetch = jest.fn(fetch);

    return store.dispatch(listToggleFlag(0)).then(() => {
      expect(store.getActions()).toEqual(actionList);
    });

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => {

    const status = 500;
    const statusText = "Internal Server Error";

    const store = mockStore(getLastState());
    const actionList = [metaAddErrors([`${status} ${statusText}`])];

    const fetch = () => Promise.resolve({
      status,
      statusText,
      ok: false
    });

    global.fetch = jest.fn(fetch);

    return store.dispatch(listToggleFlag(0)).then(() => {
      expect(store.getActions()).toEqual(actionList);
    });

  });

});

//list toggle hide

describe("listToggleHide", () => {

  const { listToggleHide, metaAddErrors, metaSetState } = actions;

  const getLastState = () => deepCopy(initialState, {
    user: { id: "id-a" },
    list: { loaded: [{ id: "id-b" }] }
  });

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const res = { polls: [{ users: { hidden: ["id-a"] } }] };

    const store = mockStore(getLastState());
    const actionList = [metaSetState(res)];

    const fetch = () => Promise.resolve({
      ok: true,
      json() {
        return res;
      }
    });

    global.fetch = jest.fn(fetch);

    return store.dispatch(listToggleHide(0)).then(() => {
      expect(store.getActions()).toEqual(actionList);
    });

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => {

    const status = 500;
    const statusText = "Internal Server Error";

    const store = mockStore(getLastState());
    const actionList = [metaAddErrors([`${status} ${statusText}`])];

    const fetch = () => Promise.resolve({
      status,
      statusText,
      ok: false
    });

    global.fetch = jest.fn(fetch);

    return store.dispatch(listToggleHide(0)).then(() => {
      expect(store.getActions()).toEqual(actionList);
    });

  });

});

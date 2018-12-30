"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState } = require("../../../scripts/reducer/reducer");
const { testAPIFailure, testAPISuccess } = require("../../test-helpers");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//node modules

const configureStore = require("redux-mock-store").default;
const ReduxThunk = require("redux-thunk").default;

//setup

const middleware = [ReduxThunk];
const mockStore = configureStore(middleware);

describe("listSubmitSearch", () => {

  const { listSubmitSearch, metaAddErrors, metaSetState } = actions;

  const action = listSubmitSearch();

  const getLastState = (search) => deepCopy(initialState, { list: { search } });

  it("dispatches META_ADD_ERRORS actions with empty input", () => {

    const lastState = getLastState("");

    const store = mockStore(lastState);
    const actionList = [metaAddErrors(["Nothing will come of nothing"])];

    store.dispatch(action);

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

    store.dispatch(action);

    expect(store.getActions()).toEqual(actionList);

  });

});

//list toggle flag

describe("listToggleFlag", () => {

  const { listToggleFlag, metaSetState } = actions;

  const action = listToggleFlag("");

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({})];

    return testAPISuccess(action, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action));

});

//list toggle hide

describe("listToggleHide", () => {

  const { listToggleHide, metaSetState } = actions;

  const action = listToggleHide("");

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({})];

    return testAPISuccess(action, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action));

});

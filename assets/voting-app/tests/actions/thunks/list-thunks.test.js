"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState } = require("../../../scripts/reducer/reducer");
const { testAPIFailure, testAPISuccess } = require("../../test-helpers");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//list set sort

describe("listSetSort", () => {

  const { listSetSort, metaSetState } = actions;

  const action = listSetSort("popular");

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({
      polls: {},
      list: {
        sort: "popular",
        index: 0
      }
    })];

    return testAPISuccess(action, { polls: {} }, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action));

});

//list submit search

describe("listSubmitSearch", () => {

  const { listSubmitSearch, metaAddErrors, metaSetState } = actions;

  const action = listSubmitSearch();

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({
      polls: {},
      list: {
        search: "",
        searched: "a",
        index: 0
      }
    })];

    const lastState = deepCopy(initialState, { list: { search: "a" } });

    return testAPISuccess(action, { polls: {} }, actionList, lastState);

  });

  it("dispatches META_ADD_ERRORS actions on success (errors)", () => {

    const actionList = [metaAddErrors([])];

    return testAPISuccess(action, { errors: [] }, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action));

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

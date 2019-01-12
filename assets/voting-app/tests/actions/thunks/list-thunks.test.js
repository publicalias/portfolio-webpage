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

  const sort = "popular";
  const merge = {
    sort,
    index: 0
  };

  const action = listSetSort(sort);
  const args = {
    path: "/api/list-set-sort",
    body: { list: deepCopy(initialState.list, merge) }
  };

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({
      polls: {},
      list: merge
    })];

    return testAPISuccess(action, args, { polls: {} }, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action, args));

});

//list submit search

describe("listSubmitSearch", () => {

  const { listSubmitSearch, metaAddErrors, metaSetState } = actions;

  const searched = "a";
  const merge = {
    search: "",
    searched,
    index: 0
  };

  const action = listSubmitSearch();
  const args = {
    path: "/api/list-submit-search",
    body: { list: deepCopy(initialState.list, merge) }
  };

  const getLastState = () => deepCopy(initialState, { list: { search: searched } });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({
      polls: {},
      list: merge
    })];
    const lastState = getLastState();

    return testAPISuccess(action, args, { polls: {} }, actionList, lastState);

  });

  it("dispatches META_ADD_ERRORS actions on success (errors)", () => {

    const actionList = [metaAddErrors([])];
    const lastState = getLastState();

    return testAPISuccess(action, args, { errors: [] }, actionList, lastState);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => {

    const lastState = getLastState();

    return testAPIFailure(action, args, lastState);

  });

});

//list toggle flag

describe("listToggleFlag", () => {

  const { listToggleFlag, metaSetState } = actions;

  const action = listToggleFlag("");
  const args = {
    path: "/api/list-toggle-flag",
    body: {
      poll: "",
      list: initialState.list
    }
  };

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({})];

    return testAPISuccess(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action, args));

});

//list toggle hide

describe("listToggleHide", () => {

  const { listToggleHide, metaSetState } = actions;

  const action = listToggleHide("");
  const args = {
    path: "/api/list-toggle-hide",
    body: {
      poll: "",
      list: initialState.list
    }
  };

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({})];

    return testAPISuccess(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action, args));

});

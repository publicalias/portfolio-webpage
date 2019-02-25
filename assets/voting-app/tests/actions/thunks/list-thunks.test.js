"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState } = require("../../../scripts/reducer/reducer");
const { testAPIFailure, testAPISuccess } = require("../../test-helpers");

//global imports

const { deepCopy } = require("utilities");

//setup

afterEach(() => {
  global.fetch = undefined;
  global.Headers = undefined;
});

//list set sort

describe("listSetSort", () => {

  const { listSetSort, metaSetState } = actions;

  const merge = {
    sort: "popular",
    index: 0
  };

  const action = listSetSort("popular");
  const args = {
    path: "/api/list-set-sort",
    method: "GET",
    data: { list: deepCopy(initialState.list, merge) }
  };

  it("dispatches META_SET_STATE action on success", () => {

    const actionList = [metaSetState({
      polls: {},
      list: merge
    })];

    return testAPISuccess(action, args, { polls: {} }, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});

//list submit search

describe("listSubmitSearch", () => {

  const { listSubmitSearch, metaAddErrors, metaSetState } = actions;

  const merge = {
    search: "",
    searched: "a",
    index: 0
  };

  const action = listSubmitSearch();
  const args = {
    path: "/api/list-submit-search",
    method: "GET",
    data: { list: deepCopy(initialState.list, merge) }
  };
  const lastState = deepCopy(initialState, { list: { search: "a" } });

  it("dispatches META_SET_STATE action on success", () => {

    const actionList = [metaSetState({
      polls: {},
      list: merge
    })];

    return testAPISuccess(action, args, { polls: {} }, actionList, lastState);

  });

  it("dispatches META_ADD_ERRORS action on success (errors)", () => {

    const actionList = [metaAddErrors([])];

    return testAPISuccess(action, args, { errors: [] }, actionList, lastState);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args, lastState));

});

//list toggle flag

describe("listToggleFlag", () => {

  const { listToggleFlag, metaSetState } = actions;

  const action = listToggleFlag("");
  const args = {
    path: "/api/list-toggle-flag",
    method: "PATCH",
    data: {
      poll: "",
      list: initialState.list
    }
  };

  it("dispatches META_SET_STATE action on success", () => {

    const actionList = [metaSetState({})];

    return testAPISuccess(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});

//list toggle hide

describe("listToggleHide", () => {

  const { listToggleHide, metaSetState } = actions;

  const action = listToggleHide("");
  const args = {
    path: "/api/list-toggle-hide",
    method: "PATCH",
    data: {
      poll: "",
      list: initialState.list
    }
  };

  it("dispatches META_SET_STATE action on success", () => {

    const actionList = [metaSetState({})];

    return testAPISuccess(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});

"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState } = require("../../../scripts/reducer/reducer");
const { testAPIFailure, testAPISuccess } = require("../../test-helpers");

//global imports

const { deepCopy } = require("utilities");

//menu set filter

describe("menuSetFilter", () => {

  const { menuSetFilter, metaSetState } = actions;

  const merge = {
    filter: "created",
    index: 0
  };

  const action = menuSetFilter("created");
  const args = {
    path: "/api/menu-set-filter",
    method: "GET",
    data: { list: deepCopy(initialState.list, merge) }
  };

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE action on success", () => {

    const actionList = [metaSetState({
      polls: {},
      list: merge
    })];

    return testAPISuccess(action, args, { polls: {} }, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});

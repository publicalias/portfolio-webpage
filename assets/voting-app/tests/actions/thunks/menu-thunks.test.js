"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState } = require("../../../scripts/reducer/reducer");
const { testAPIFailure, testAPISuccess } = require("../../test-helpers");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//menu set filter

describe("menuSetFilter", () => {

  const { menuSetFilter, metaSetState } = actions;

  const filter = "created";
  const merge = {
    filter,
    index: 0
  };

  const action = menuSetFilter(filter);
  const args = {
    path: "/api/menu-set-filter",
    method: "GET",
    data: { list: deepCopy(initialState.list, merge) }
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

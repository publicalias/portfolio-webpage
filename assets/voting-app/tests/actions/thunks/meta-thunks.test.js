"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState } = require("../../../scripts/reducer/reducer");
const { testAPIFailure, testAPISuccess } = require("../../test-helpers");

//global imports

const { deepCopy } = require("utilities");

//meta get polls

describe("metaGetPolls", () => {

  const { metaGetPolls, metaSetState } = actions;

  const action = metaGetPolls();
  const args = {
    path: "/api/meta-get-polls",
    method: "GET",
    data: {
      skip: false,
      list: initialState.list
    }
  };

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE action on success", () => {

    const actionList = [metaSetState({})];

    return testAPISuccess(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});

//meta get user

describe("metaGetUser", () => {

  const { metaGetUser, metaSetState } = actions;

  const action = metaGetUser();
  const args = {
    path: "/api/meta-get-user",
    method: "GET"
  };

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE action on success", () => {

    const res = { user: { id: "id-a" } };

    const merge = deepCopy(initialState, res);

    delete merge.polls;
    delete merge.errors;

    const actionList = [metaSetState(merge, { object: true })];

    return testAPISuccess(action, args, res, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});

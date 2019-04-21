"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { initialState } = require("../../../../scripts/state/reducer/reducer");
const { testAPI } = require("../../../test-helpers");

//meta get polls

describe("metaGetPolls", () => {

  const { metaGetPolls, metaSetState } = actions;

  const action = metaGetPolls();
  const args = {
    path: "/api/meta-get-polls",
    method: "GET",
    data: {
      id: undefined,
      skip: false,
      list: initialState.list
    }
  };

  it("dispatches META_SET_STATE action on success", () => {

    const res = { polls: [] };

    const actionList = [metaSetState(res)];

    return testAPI.success(action, args, res, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

//meta get user

describe("metaGetUser", () => {

  const { metaGetUser, metaSetState } = actions;

  const action = metaGetUser();
  const args = {
    path: "/api/meta-get-user",
    method: "GET"
  };

  it("dispatches META_SET_STATE action on success", () => {

    const res = { user: { id: "id-a" } };

    const actionList = [metaSetState(res)];

    return testAPI.success(action, args, res, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

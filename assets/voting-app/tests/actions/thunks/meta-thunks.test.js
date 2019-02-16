"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState } = require("../../../scripts/reducer/reducer");
const { testAPIFailure, testAPISuccess } = require("../../test-helpers");

describe("metaGetPolls", () => {

  const { metaGetPolls, metaSetState } = actions;

  const action = metaGetPolls();
  const args = {
    path: "/api/meta-get-polls",
    method: "GET",
    data: { list: initialState.list }
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

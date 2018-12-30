"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { testAPIFailure, testAPISuccess } = require("../../test-helpers");

describe("metaGetPolls", () => {

  const { metaGetPolls, metaSetState } = actions;

  const action = metaGetPolls();

  afterAll(() => {
    global.fetch = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({})];

    return testAPISuccess(action, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action));

});

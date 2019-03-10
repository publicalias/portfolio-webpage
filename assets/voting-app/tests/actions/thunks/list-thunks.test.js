"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { testAPIFailure, testAPISuccess } = require("../../test-helpers");

afterEach(() => {
  global.fetch = undefined;
  global.Headers = undefined;
});

//list toggle flag

describe("listToggleFlag", () => {

  const { listToggleFlag, metaNoOp } = actions;

  const action = listToggleFlag("");
  const args = {
    path: "/api/list-toggle-flag",
    method: "PATCH",
    data: { id: "" }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPISuccess(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});

//list toggle hide

describe("listToggleHide", () => {

  const { listToggleHide, metaNoOp } = actions;

  const action = listToggleHide("");
  const args = {
    path: "/api/list-toggle-hide",
    method: "PATCH",
    data: { id: "" }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPISuccess(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});

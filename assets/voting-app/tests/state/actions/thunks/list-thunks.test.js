"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testAPI, testThunk } = require("../../../test-helpers");

//global imports

const { initHistory } = require("client-tests");
const { newState } = require("schemas/voting-app");

//list open view

describe("listOpenView", () => {

  const { listOpenView, metaSetState } = actions;

  const { history, testHistory } = initHistory();

  const action = listOpenView("id-a", history);

  it("dispatches META_SET_STATE action", () => {

    testThunk(action, [metaSetState({ view: newState().view })]);

    testHistory(["/voting-app/view/id-a"]);

  });

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

    return testAPI.success(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

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

    return testAPI.success(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

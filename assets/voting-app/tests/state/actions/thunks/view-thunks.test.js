"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testAPIFailure, testAPISuccess } = require("../../../test-helpers");

//setup

afterEach(() => {
  global.fetch = undefined;
  global.Headers = undefined;
});

//view add option

describe("viewAddOption", () => {

  const { metaAddErrors, metaNoOp, viewAddOption } = actions;

  const action = viewAddOption("");
  const args = {
    path: "/api/view-add-option",
    method: "PATCH",
    data: {
      id: "",
      text: ""
    }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPISuccess(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on success (errors)", () => {

    const actionList = [metaAddErrors([])];

    return testAPISuccess(action, args, { errors: [] }, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});

//view cast vote

describe("viewCastVote", () => {

  const { metaNoOp, viewCastVote } = actions;

  const action = viewCastVote("", "");
  const args = {
    path: "/api/view-cast-vote",
    method: "PATCH",
    data: {
      id: "",
      text: ""
    }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPISuccess(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});

//view delete poll

describe("viewDeletePoll", () => {

  const { metaSetState, viewDeletePoll } = actions;

  const action = viewDeletePoll("id-a");
  const args = {
    path: "/api/view-delete-poll",
    method: "DELETE",
    data: { id: "id-a" }
  };

  it("dispatches META_SET_STATE action on success", () => {

    const actionList = [metaSetState({ page: "list" })];

    return testAPISuccess(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});

//view remove option

describe("viewRemoveOption", () => {

  const { metaNoOp, viewRemoveOption } = actions;

  const action = viewRemoveOption("", "");
  const args = {
    path: "/api/view-remove-option",
    method: "PATCH",
    data: {
      id: "",
      text: ""
    }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPISuccess(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});

//view toggle private

describe("viewTogglePrivate", () => {

  const { metaNoOp, viewTogglePrivate } = actions;

  const action = viewTogglePrivate("");
  const args = {
    path: "/api/view-toggle-private",
    method: "PATCH",
    data: { id: "" }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPISuccess(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPIFailure(action, args));

});

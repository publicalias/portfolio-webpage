"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//poll add option

describe("pollAddOption", () => {

  const { metaAddErrors, metaNoOp, pollAddOption } = actions;

  const action = pollAddOption("", "");
  const args = {
    path: "/voting-app/api/poll-add-option",
    method: "PATCH",
    data: {
      id: "",
      text: ""
    }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPI.success(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on success (errors)", () => {

    const actionList = [metaAddErrors([])];

    return testAPI.success(action, args, { errors: [] }, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

//poll cast vote

describe("pollCastVote", () => {

  const { metaNoOp, pollCastVote } = actions;

  const action = pollCastVote("", "");
  const args = {
    path: "/voting-app/api/poll-cast-vote",
    method: "PATCH",
    data: {
      id: "",
      text: ""
    }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPI.success(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

//poll remove option

describe("pollRemoveOption", () => {

  const { metaNoOp, pollRemoveOption } = actions;

  const action = pollRemoveOption("", "");
  const args = {
    path: "/voting-app/api/poll-remove-option",
    method: "PATCH",
    data: {
      id: "",
      text: ""
    }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPI.success(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

//poll toggle flag

describe("pollToggleFlag", () => {

  const { metaNoOp, pollToggleFlag } = actions;

  const action = pollToggleFlag("");
  const args = {
    path: "/voting-app/api/poll-toggle-flag",
    method: "PATCH",
    data: { id: "" }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPI.success(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

//poll toggle hide

describe("pollToggleHide", () => {

  const { metaNoOp, pollToggleHide } = actions;

  const action = pollToggleHide("");
  const args = {
    path: "/voting-app/api/poll-toggle-hide",
    method: "PATCH",
    data: { id: "" }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPI.success(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

//poll toggle secret

describe("pollToggleSecret", () => {

  const { metaNoOp, pollToggleSecret } = actions;

  const action = pollToggleSecret("");
  const args = {
    path: "/voting-app/api/poll-toggle-secret",
    method: "PATCH",
    data: { id: "" }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPI.success(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

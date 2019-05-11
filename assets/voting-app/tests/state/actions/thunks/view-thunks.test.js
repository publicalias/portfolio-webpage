"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testAPI, testThunk } = require("../../../test-helpers");

//global imports

const { initHistory } = require("test-helpers/redux-tests");

//view add option

describe("viewAddOption", () => {

  const { metaAddErrors, metaNoOp, viewAddOption } = actions;

  const action = viewAddOption("");
  const args = {
    path: "/voting-app/api/view-add-option",
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

//view cast vote

describe("viewCastVote", () => {

  const { metaNoOp, viewCastVote } = actions;

  const action = viewCastVote("", "");
  const args = {
    path: "/voting-app/api/view-cast-vote",
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

//view delete poll

describe("viewDeletePoll", () => {

  const { metaNoOp, viewDeletePoll } = actions;

  const { history, testHistory } = initHistory();

  const action = viewDeletePoll("id-a", history);
  const args = {
    path: "/voting-app/api/view-delete-poll",
    method: "DELETE",
    data: { id: "id-a" }
  };

  it("dispatches META_NO_OP action on success", async () => {

    const actionList = [metaNoOp()];

    await testAPI.success(action, args, {}, actionList);

    testHistory(["/list"]);

  });

  it("dispatches META_ADD_ERRORS action on failure", async () => {

    await testAPI.failure(action, args);

    testHistory([]);

  });

});

//view open list

describe("viewOpenList", () => {

  const { metaNoOp, viewOpenList } = actions;

  const { history, testHistory } = initHistory();

  const action = viewOpenList(history);

  it("dispatches META_NO_OP action", () => {

    testThunk(action, [metaNoOp()]);

    testHistory(["/list"]);

  });

});

//view remove option

describe("viewRemoveOption", () => {

  const { metaNoOp, viewRemoveOption } = actions;

  const action = viewRemoveOption("", "");
  const args = {
    path: "/voting-app/api/view-remove-option",
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

//view toggle private

describe("viewTogglePrivate", () => {

  const { metaNoOp, viewTogglePrivate } = actions;

  const action = viewTogglePrivate("");
  const args = {
    path: "/voting-app/api/view-toggle-private",
    method: "PATCH",
    data: { id: "" }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPI.success(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

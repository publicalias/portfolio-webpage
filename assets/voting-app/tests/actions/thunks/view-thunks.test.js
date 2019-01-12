"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState } = require("../../../scripts/reducer/reducer");
const { testAPIFailure, testAPISuccess } = require("../../test-helpers");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//view add option

describe("viewAddOption", () => {

  const { metaAddErrors, metaSetState, viewAddOption } = actions;

  const action = viewAddOption("");
  const args = {
    path: "/api/view-add-option",
    body: {
      poll: "",
      text: "",
      list: initialState.list
    }
  };

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({})];

    return testAPISuccess(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on success (errors)", () => {

    const actionList = [metaAddErrors([])];

    return testAPISuccess(action, args, { errors: [] }, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action, args));

});

//view cast vote

describe("viewCastVote", () => {

  const { metaSetState, viewCastVote } = actions;

  const action = viewCastVote("", "");
  const args = {
    path: "/api/view-cast-vote",
    body: {
      poll: "",
      text: "",
      list: initialState.list
    }
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

//view delete poll

describe("viewDeletePoll", () => {

  const { metaSetState, viewDeletePoll } = actions;

  const action = viewDeletePoll("id-a");
  const args = {
    path: "/api/view-delete-poll",
    body: {
      poll: "id-a",
      list: initialState.list
    }
  };

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success (next poll)", () => {

    const poll = "id-b";
    const polls = [{ id: poll }];

    const actionList = [metaSetState({
      polls,
      view: deepCopy(initialState.view, { poll })
    })];

    return testAPISuccess(action, args, { polls }, actionList);

  });

  it("dispatches META_SET_STATE actions on success (no next poll)", () => {

    const res = { polls: [] };

    const actionList = [metaSetState({
      polls: [],
      page: "list"
    })];

    return testAPISuccess(action, args, res, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action, args));

});

//view remove option

describe("viewRemoveOption", () => {

  const { metaSetState, viewRemoveOption } = actions;

  const action = viewRemoveOption("", "");
  const args = {
    path: "/api/view-remove-option",
    body: {
      poll: "",
      text: "",
      list: initialState.list
    }
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

//view toggle private

describe("viewTogglePrivate", () => {

  const { metaSetState, viewTogglePrivate } = actions;

  const action = viewTogglePrivate("");
  const args = {
    path: "/api/view-toggle-private",
    body: {
      poll: "",
      list: initialState.list
    }
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

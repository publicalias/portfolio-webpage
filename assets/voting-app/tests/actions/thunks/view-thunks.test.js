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

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({})];

    return testAPISuccess(action, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on success (errors)", () => {

    const actionList = [metaAddErrors([])];

    return testAPISuccess(action, { errors: [] }, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action));

});

//view cast vote

describe("viewCastVote", () => {

  const { metaSetState, viewCastVote } = actions;

  const action = viewCastVote("", "");

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({})];

    return testAPISuccess(action, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action));

});

//view delete poll

describe("viewDeletePoll", () => {

  const { metaSetState, viewDeletePoll } = actions;

  const action = viewDeletePoll("id-a");

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

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

    return testAPISuccess(action, { polls }, actionList);

  });

  it("dispatches META_SET_STATE actions on success (no next poll)", () => {

    const res = { polls: [] };

    const actionList = [metaSetState({
      polls: [],
      page: "list"
    })];

    return testAPISuccess(action, res, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action));

});

//view remove option

describe("viewRemoveOption", () => {

  const { metaSetState, viewRemoveOption } = actions;

  const action = viewRemoveOption("", "");

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({})];

    return testAPISuccess(action, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action));

});

//view toggle private

describe("viewTogglePrivate", () => {

  const { metaSetState, viewTogglePrivate } = actions;

  const action = viewTogglePrivate("");

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const actionList = [metaSetState({})];

    return testAPISuccess(action, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action));

});

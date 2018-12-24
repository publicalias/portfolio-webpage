"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState } = require("../../../scripts/reducer/reducer");
const { testAPIFailure, testAPISuccess } = require("../../test-helpers");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//menu auth user

describe("menuAuthUser", () => {

  const { menuAuthUser, metaSetState } = actions;

  const action = menuAuthUser("auth", {});

  beforeAll(() => {
    global.Headers = jest.fn((init) => init);
  });

  afterAll(() => {
    global.fetch = undefined;
    global.Headers = undefined;
  });

  it("dispatches META_SET_STATE actions on success", () => {

    const res = { user: { id: "id-a" } };

    const merge = deepCopy(initialState, res);

    delete merge.polls;
    delete merge.errors;

    const actionList = [metaSetState(merge, { object: true })];

    return testAPISuccess(action, res, actionList);

  });

  it("dispatches META_ADD_ERRORS actions on failure", () => testAPIFailure(action));

});

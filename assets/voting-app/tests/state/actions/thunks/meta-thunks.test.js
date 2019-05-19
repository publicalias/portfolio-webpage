"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//global imports

const { newListParams, newState } = require("schemas/voting-app");

//meta create poll

describe("metaCreatePoll", () => {

  const { metaAddErrors, metaCreatePoll, metaNoOp } = actions;

  const getData = () => newState().form;

  const action = metaCreatePoll(getData());
  const args = {
    path: "/voting-app/api/meta-create-poll",
    method: "POST",
    data: getData()
  };

  it("dispatches META_SET_STATE action on success", () => {

    const actionList = [metaNoOp()];

    return testAPI.success(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on success (errors)", () => {

    const actionList = [metaAddErrors([])];

    return testAPI.success(action, args, { errors: [] }, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

//meta delete poll

describe("metaDeletePoll", () => {

  const { metaDeletePoll, metaNoOp } = actions;

  const action = metaDeletePoll("id-a");
  const args = {
    path: "/voting-app/api/meta-delete-poll",
    method: "DELETE",
    data: { id: "id-a" }
  };

  it("dispatches META_NO_OP action on success", () => {

    const actionList = [metaNoOp()];

    return testAPI.success(action, args, {}, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

//meta get polls

describe("metaGetPolls", () => {

  const { metaGetPolls, metaSetState } = actions;

  const params = newListParams();

  const action = metaGetPolls(params);
  const args = {
    path: "/voting-app/api/meta-get-polls",
    method: "GET",
    data: {
      params,
      id: undefined,
      length: undefined
    }
  };

  it("dispatches META_SET_STATE action on success", () => {

    const res = { polls: [] };

    const actionList = [metaSetState(res)];

    return testAPI.success(action, args, res, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

//meta get user

describe("metaGetUser", () => {

  const { metaGetUser, metaSetState } = actions;

  const action = metaGetUser();
  const args = {
    path: "/voting-app/api/meta-get-user",
    method: "GET"
  };

  it("dispatches META_SET_STATE action on success", () => {

    const res = { user: { id: "id-a" } };

    const actionList = [metaSetState(res)];

    return testAPI.success(action, args, res, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

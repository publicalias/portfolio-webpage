"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testAPI, testThunk } = require("../../../test-helpers");

//global imports

const { newState } = require("schemas/voting-app");
const { initHistory } = require("test-helpers/redux-tests");
const { deepCopy } = require("utilities");

//meta create poll

describe("metaCreatePoll", () => {

  const { metaAddErrors, metaCreatePoll, metaSetState } = actions;

  const { history, testHistory } = initHistory();

  const getData = () => newState().form;

  const action = metaCreatePoll(getData(), history);
  const args = {
    path: "/voting-app/api/meta-create-poll",
    method: "POST",
    data: getData()
  };

  it("dispatches META_SET_STATE action on success", async () => {

    const { list, form, view } = newState();

    const res = { id: "id-a" };

    const actionList = [metaSetState({
      list: deepCopy(list, { filter: "created" }),
      form: deepCopy(form),
      view: deepCopy(view)
    })];

    await testAPI.success(action, args, res, actionList);

    testHistory(["/view?id=id-a"]);

  });

  it("dispatches META_ADD_ERRORS action on success (errors)", async () => {

    const actionList = [metaAddErrors([])];

    await testAPI.success(action, args, { errors: [] }, actionList);

    testHistory();

  });

  it("dispatches META_ADD_ERRORS action on failure", async () => {

    await testAPI.failure(action, args);

    testHistory();

  });

});

//meta delete poll

describe("metaDeletePoll", () => {

  const { metaDeletePoll, metaNoOp } = actions;

  const { history, testHistory } = initHistory();

  const action = metaDeletePoll("id-a", history);
  const args = {
    path: "/voting-app/api/meta-delete-poll",
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

    testHistory();

  });

});

//meta get polls

describe("metaGetPolls", () => {

  const { metaGetPolls, metaSetState } = actions;

  const action = metaGetPolls();
  const args = {
    path: "/voting-app/api/meta-get-polls",
    method: "GET",
    data: {
      id: undefined,
      skip: false,
      list: newState().list
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

//meta open form

describe("metaOpenForm", () => {

  const { metaOpenForm, metaSetState } = actions;

  const { history, testHistory } = initHistory();

  const action = metaOpenForm(history);

  it("dispatches META_SET_STATE action", () => {

    testThunk(action, [metaSetState({ form: newState().form })]);

    testHistory(["/form"]);

  });

});

//meta open list

describe("metaOpenList", () => {

  const { metaNoOp, metaOpenList } = actions;

  const { history, testHistory } = initHistory();

  const action = metaOpenList(history);

  it("dispatches META_NO_OP action", () => {

    testThunk(action, [metaNoOp()]);

    testHistory(["/list"]);

  });

});

//meta open view

describe("metaOpenView", () => {

  const { metaOpenView, metaSetState } = actions;

  const { history, testHistory } = initHistory();

  const action = metaOpenView("id-a", history);

  it("dispatches META_SET_STATE action", () => {

    testThunk(action, [metaSetState({ view: newState().view })]);

    testHistory(["/view?id=id-a"]);

  });

});

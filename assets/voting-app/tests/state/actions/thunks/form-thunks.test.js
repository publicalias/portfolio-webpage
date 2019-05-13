"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//global imports

const { newState } = require("schemas/voting-app");
const { initHistory } = require("test-helpers/redux-tests");
const { deepCopy } = require("utilities");

//form create poll

describe("formCreatePoll", () => {

  const { formCreatePoll, metaAddErrors, metaSetState } = actions;

  const { history, testHistory } = initHistory();

  const action = formCreatePoll(history);
  const args = {
    path: "/voting-app/api/form-create-poll",
    method: "POST",
    data: { form: newState().form }
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

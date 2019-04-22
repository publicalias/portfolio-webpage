"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testAPI, testThunk } = require("../../../test-helpers");

//global imports

const { initHistory } = require("client-tests");
const { newState } = require("schemas/voting-app");
const { deepCopy } = require("utilities");

//form add option

describe("formAddOption", () => {

  const { formAddOption, metaAddErrors, metaSetState } = actions;

  const action = formAddOption();

  const testOption = (add, output) => {

    const actionList = [typeof output === "string" ? metaAddErrors([output]) : metaSetState(output)];

    testThunk(action, actionList, deepCopy(newState(), {
      form: {
        options: ["Option A", "Option B"],
        add
      }
    }));

  };

  it("dispatches META_ADD_ERRORS action if option is empty", () => {
    testOption("", "Option must not be empty");
  });

  it("dispatches META_ADD_ERRORS action if option is duplicate", () => {
    testOption("Option A", "Option must be unique");
  });

  it("dispatches META_ADD_ERRORS action if option is obscene", () => {
    testOption("Fuck", "Option must not be obscene");
  });

  it("dispatches META_SET_STATE action if option is valid", () => {
    testOption("Option C", {
      form: {
        options: ["Option A", "Option B", "Option C"],
        add: ""
      }
    });
  });

});

//form create poll

describe("formCreatePoll", () => {

  const { formCreatePoll, metaAddErrors, metaSetState } = actions;

  const { history, testHistory } = initHistory();

  const action = formCreatePoll(history);
  const args = {
    path: "/api/form-create-poll",
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

    testHistory(["/voting-app/view/id-a"]);

  });

  it("dispatches META_ADD_ERRORS action on success (errors)", async () => {

    const actionList = [metaAddErrors([])];

    await testAPI.success(action, args, { errors: [] }, actionList);

    testHistory([]);

  });

  it("dispatches META_ADD_ERRORS action on failure", async () => {

    await testAPI.failure(action, args);

    testHistory([]);

  });

});

"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//form add option

describe("formAddOption", () => {

  const { formAddOption, metaAddErrors, metaSetState } = actions;

  const action = formAddOption("", []);
  const args = {
    path: "/voting-app/api/form-add-option",
    method: "GET",
    data: {
      add: "",
      options: []
    }
  };

  it("dispatches META_SET_STATE action on success", () => {

    const res = {
      form: {
        options: [],
        add: ""
      }
    };

    const actionList = [metaSetState(res)];

    return testAPI.success(action, args, res, actionList);

  });

  it("dispatches META_ADD_ERRORS action on success (errors)", () => {

    const actionList = [metaAddErrors([])];

    return testAPI.success(action, args, { errors: [] }, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

//form set title

describe("formSetTitle", () => {

  const { formSetTitle, metaAddErrors, metaSetState } = actions;

  const action = formSetTitle("");
  const args = {
    path: "/voting-app/api/form-set-title",
    method: "GET",
    data: { title: "" }
  };

  it("dispatches META_SET_STATE action on success", () => {

    const res = { form: { title: "" } };

    const actionList = [metaSetState(res)];

    return testAPI.success(action, args, res, actionList);

  });

  it("dispatches META_ADD_ERRORS action on success (errors)", () => {

    const actionList = [metaAddErrors([])];

    return testAPI.success(action, args, { errors: [] }, actionList);

  });

  it("dispatches META_ADD_ERRORS action on failure", () => testAPI.failure(action, args));

});

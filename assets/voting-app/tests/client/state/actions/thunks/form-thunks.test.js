"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//form add option

describe("formAddOption", () => {

  const { formAddOption } = actions;

  testAPI.default(formAddOption("", []), {
    path: "/voting-app/api/form-add-option",
    method: "GET",
    data: {
      add: "",
      options: []
    }
  });

});

//form set title

describe("formSetTitle", () => {

  const { formSetTitle } = actions;

  testAPI.default(formSetTitle(""), {
    path: "/voting-app/api/form-set-title",
    method: "GET",
    data: { title: "" }
  });

});

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

//form check title

describe("formCheckTitle", () => {

  const { formCheckTitle } = actions;

  testAPI.default(formCheckTitle(""), {
    path: "/voting-app/api/form-check-title",
    method: "GET",
    data: { title: "" }
  });

});

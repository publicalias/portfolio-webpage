"use strict";

//local imports

const { newListParamsUsers } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//user get data

describe("userGetData", () => {

  const { userGetData } = actions;

  const params = newListParamsUsers();

  testAPI.default(userGetData(params), {
    path: "/nightlife-app/api/user-get-data",
    method: "GET",
    data: {
      params,
      id: undefined,
      length: undefined
    }
  });

});

//user toggle block

describe("userToggleBlock", () => {

  const { userToggleBlock } = actions;

  testAPI.default(userToggleBlock(""), {
    path: "/nightlife-app/api/user-toggle-block",
    method: "PATCH",
    data: { id: "" }
  });

});

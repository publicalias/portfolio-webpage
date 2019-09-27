"use strict";

//local imports

const { newListParamsUsers } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//user get item

describe("userGetItem", () => {

  const { userGetItem } = actions;

  testAPI.default(userGetItem("", null), {
    path: "/nightlife-app/api/user-get-item",
    method: "GET",
    data: {
      id: "",
      location: null
    }
  });

});

//user get list

describe("userGetList", () => {

  const { userGetList } = actions;

  const params = newListParamsUsers();

  testAPI.default(userGetList(params, 0, null), {
    path: "/nightlife-app/api/user-get-list",
    method: "GET",
    data: {
      params,
      length: 0,
      location: null
    }
  }, {
    array: false
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

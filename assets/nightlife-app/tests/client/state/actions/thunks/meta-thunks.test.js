"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//meta get user

describe("metaGetUser", () => {

  const { metaGetUser } = actions;

  testAPI.default(metaGetUser(), {
    path: "/nightlife-app/api/meta-get-user",
    method: "GET"
  });

});

//meta save address

describe("metaSaveAddress", () => {

  const { metaSaveAddress } = actions;

  testAPI.default(metaSaveAddress("", null), {
    path: "/nightlife-app/api/meta-save-address",
    method: "PATCH",
    data: {
      address: "",
      location: null
    }
  });

});

//meta save avatar

describe("metaSaveAvatar", () => {

  const { metaSaveAvatar } = actions;

  testAPI.default(metaSaveAvatar(""), {
    path: "/nightlife-app/api/meta-save-avatar",
    method: "PATCH",
    data: { avatar: "" }
  });

});

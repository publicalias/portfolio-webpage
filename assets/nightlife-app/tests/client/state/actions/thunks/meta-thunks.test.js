"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//meta get user

describe("metaGetUser", () => {

  const { metaGetUser } = actions;

  testAPI.default(metaGetUser(), {
    type: "META_GET_USER",
    path: "/nightlife-app/api/meta-get-user",
    method: "GET"
  });

});

//meta save address

describe("metaSaveAddress", () => {

  const { metaSaveAddress } = actions;

  testAPI.default(metaSaveAddress("", null), {
    type: "META_SAVE_ADDRESS",
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
    type: "META_SAVE_AVATAR",
    path: "/nightlife-app/api/meta-save-avatar",
    method: "PATCH",
    data: { avatar: "" }
  });

});

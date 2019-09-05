"use strict";

//local imports

const { newUserData } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//meta add app data

describe("metaAddAppData", () => {

  const { metaAddAppData } = actions;

  testAPI.default(metaAddAppData(), {
    path: "/nightlife-app/api/meta-add-app-data",
    method: "PATCH",
    data: newUserData()
  });

});

//meta get user

describe("metaGetUser", () => {

  const { metaGetUser } = actions;

  testAPI.default(metaGetUser(), {
    path: "/nightlife-app/api/meta-get-user",
    method: "GET"
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

//meta save zip code

describe("metaSaveZipCode", () => {

  const { metaSaveZipCode } = actions;

  testAPI.default(metaSaveZipCode(""), {
    path: "/nightlife-app/api/meta-save-zip-code",
    method: "PATCH",
    data: { zipCode: "" }
  });

});

"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");

//user clear state

test("userClearState creates USER_CLEAR_STATE actions", () => {

  const { userClearState } = actions;

  expect(userClearState()).toEqual({ type: "USER_CLEAR_STATE" });

});

//user set name

test("userSetName creates USER_SET_NAME actions", () => {

  const { userSetName } = actions;

  expect(userSetName("")).toEqual({
    type: "USER_SET_NAME",
    name: ""
  });

});

//user set zip code

test("userSetZipCode creates USER_SET_ZIP_CODE actions", () => {

  const { userSetZipCode } = actions;

  expect(userSetZipCode("")).toEqual({
    type: "USER_SET_ZIP_CODE",
    zipCode: ""
  });

});

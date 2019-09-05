"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");

//meta set avatar

test("metaSetAvatar creates META_SET_AVATAR actions", () => {

  const { metaSetAvatar } = actions;

  expect(metaSetAvatar("")).toEqual({
    type: "META_SET_AVATAR",
    avatar: ""
  });

});

//meta set zip code

test("metaSetZipCode creates META_SET_ZIP_CODE actions", () => {

  const { metaSetZipCode } = actions;

  expect(metaSetZipCode("")).toEqual({
    type: "META_SET_ZIP_CODE",
    zipCode: ""
  });

});

//meta toggle settings

test("metaToggleSettings creates META_TOGGLE_SETTINGS actions", () => {

  const { metaToggleSettings } = actions;

  expect(metaToggleSettings()).toEqual({ type: "META_TOGGLE_SETTINGS" });

});

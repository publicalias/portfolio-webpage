"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");

//meta set address

test("metaSetAddress creates META_SET_ADDRESS actions", () => {

  const { metaSetAddress } = actions;

  expect(metaSetAddress("")).toEqual({
    type: "META_SET_ADDRESS",
    address: ""
  });

});

//meta set avatar

test("metaSetAvatar creates META_SET_AVATAR actions", () => {

  const { metaSetAvatar } = actions;

  expect(metaSetAvatar("")).toEqual({
    type: "META_SET_AVATAR",
    avatar: ""
  });

});

//meta toggle loaded

test("metaToggleLoaded creates META_TOGGLE_LOADED actions", () => {

  const { metaToggleLoaded } = actions;

  expect(metaToggleLoaded()).toEqual({ type: "META_TOGGLE_LOADED" });

});

//meta toggle settings

test("metaToggleSettings creates META_TOGGLE_SETTINGS actions", () => {

  const { metaToggleSettings } = actions;

  expect(metaToggleSettings()).toEqual({ type: "META_TOGGLE_SETTINGS" });

});

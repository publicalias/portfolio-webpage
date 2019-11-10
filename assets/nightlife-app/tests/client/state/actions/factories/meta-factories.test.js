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

//meta set ready

test("metaSetReady creates META_SET_READY actions", () => {

  const { metaSetReady } = actions;

  expect(metaSetReady()).toEqual({
    type: "META_SET_READY",
    ready: false
  });

});

//meta toggle settings

test("metaToggleSettings creates META_TOGGLE_SETTINGS actions", () => {

  const { metaToggleSettings } = actions;

  expect(metaToggleSettings()).toEqual({ type: "META_TOGGLE_SETTINGS" });

});

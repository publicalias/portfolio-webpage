"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//meta set address

test("reducer accepts META_SET_ADDRESS actions", () => {

  const { metaSetAddress } = actions;

  testReducer(metaSetAddress("12345"), null, { account: { settings: { address: "12345" } } });

});

//meta set avatar

test("reducer accepts META_SET_AVATAR actions", () => {

  const { metaSetAvatar } = actions;

  const avatar = "https://www.example.com/avatar.jpg";

  testReducer(metaSetAvatar(avatar), null, { account: { settings: { avatar } } });

});

//meta set ready

test("reducer accepts META_SET_READY actions", () => {

  const { metaSetReady } = actions;

  testReducer(metaSetReady(true), null, { ready: true });

});

//meta toggle settings

test("reducer accepts META_TOGGLE_SETTINGS actions", () => {

  const { metaToggleSettings } = actions;

  testReducer(metaToggleSettings(), null, { account: { settings: { open: true } } });

});

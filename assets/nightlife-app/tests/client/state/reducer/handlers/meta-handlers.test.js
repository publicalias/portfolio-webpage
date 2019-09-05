"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//meta set avatar

test("reducer accepts META_SET_AVATAR actions", () => {

  const { metaSetAvatar } = actions;

  const avatar = "https://www.example.com/avatar.jpg";

  testReducer(metaSetAvatar(avatar), null, { account: { avatar } });

});

//meta set zip code

test("reducer accepts META_SET_ZIP_CODE actions", () => {

  const { metaSetZipCode } = actions;

  testReducer(metaSetZipCode("12345"), null, { account: { zipCode: "12345" } });

});

//meta toggle settings

test("reducer accepts META_TOGGLE_SETTINGS actions", () => {

  const { metaToggleSettings } = actions;

  testReducer(metaToggleSettings(), null, { account: { settings: true } });

});

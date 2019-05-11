"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");

//menu toggle confirm

test("menuToggleConfirm creates MENU_TOGGLE_CONFIRM actions", () => {

  const { menuToggleConfirm } = actions;

  expect(menuToggleConfirm()).toEqual({ type: "MENU_TOGGLE_CONFIRM" });

});

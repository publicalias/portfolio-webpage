"use strict";

//local imports

const { actions } = require("../../../scripts/actions/actions");

//menu open form

test("menuOpenForm creates MENU_OPEN_FORM actions", () => {

  const { menuOpenForm } = actions;

  expect(menuOpenForm()).toEqual({ type: "MENU_OPEN_FORM" });

});

//menu toggle confirm

test("menuToggleConfirm creates MENU_TOGGLE_CONFIRM actions", () => {

  const { menuToggleConfirm } = actions;

  expect(menuToggleConfirm()).toEqual({ type: "MENU_TOGGLE_CONFIRM" });

});

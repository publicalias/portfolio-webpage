"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");

//menu set filter

test("menuSetFilter creates MENU_SET_FILTER actions", () => {

  const { menuSetFilter } = actions;

  expect(menuSetFilter("")).toEqual({
    type: "MENU_SET_FILTER",
    filter: ""
  });

});

//menu toggle confirm

test("menuToggleConfirm creates MENU_TOGGLE_CONFIRM actions", () => {

  const { menuToggleConfirm } = actions;

  expect(menuToggleConfirm()).toEqual({ type: "MENU_TOGGLE_CONFIRM" });

});

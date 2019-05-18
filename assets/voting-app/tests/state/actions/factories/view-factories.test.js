"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");

//view set add

test("viewSetAdd creates VIEW_SET_ADD actions", () => {

  const { viewSetAdd } = actions;

  expect(viewSetAdd("")).toEqual({
    type: "VIEW_SET_ADD",
    add: ""
  });

});

//view toggle confirm

test("viewToggleConfirm creates VIEW_TOGGLE_CONFIRM actions", () => {

  const { viewToggleConfirm } = actions;

  expect(viewToggleConfirm()).toEqual({ type: "VIEW_TOGGLE_CONFIRM" });

});

//view toggle settings

test("viewToggleSettings creates VIEW_TOGGLE_SETTINGS actions", () => {

  const { viewToggleSettings } = actions;

  expect(viewToggleSettings()).toEqual({ type: "VIEW_TOGGLE_SETTINGS" });

});

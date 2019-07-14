"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");

//view clear state

test("viewClearState creates VIEW_CLEAR_STATE actions", () => {

  const { viewClearState } = actions;

  expect(viewClearState()).toEqual({ type: "VIEW_CLEAR_STATE" });

});

//view set add

test("viewSetAdd creates VIEW_SET_ADD actions", () => {

  const { viewSetAdd } = actions;

  expect(viewSetAdd("")).toEqual({
    type: "VIEW_SET_ADD",
    add: ""
  });

});

//view toggle delete

test("viewToggleDelete creates VIEW_TOGGLE_DELETE actions", () => {

  const { viewToggleDelete } = actions;

  expect(viewToggleDelete()).toEqual({ type: "VIEW_TOGGLE_DELETE" });

});

//view toggle settings

test("viewToggleSettings creates VIEW_TOGGLE_SETTINGS actions", () => {

  const { viewToggleSettings } = actions;

  expect(viewToggleSettings()).toEqual({ type: "VIEW_TOGGLE_SETTINGS" });

});

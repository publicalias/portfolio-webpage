"use strict";

//local imports

const { actions } = require("../../../scripts/actions/actions");

test("viewOpenList creates VIEW_OPEN_LIST actions", () => {

  const { viewOpenList } = actions;

  expect(viewOpenList()).toEqual({ type: "VIEW_OPEN_LIST" });

});

//view set add text

test("viewSetAddText creates VIEW_SET_ADD_TEXT actions", () => {

  const { viewSetAddText } = actions;

  expect(viewSetAddText("")).toEqual({
    type: "VIEW_SET_ADD_TEXT",
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

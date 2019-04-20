"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//view set add text

test("reducer accepts VIEW_SET_ADD_TEXT actions", () => {

  const { viewSetAddText } = actions;

  testReducer(viewSetAddText("Option A"), {}, { view: { add: "Option A" } });

});

//view toggle confirm

test("reducer accepts VIEW_TOGGLE_CONFIRM actions", () => {

  const { viewToggleConfirm } = actions;

  testReducer(viewToggleConfirm(), {}, { view: { confirm: true } });

});

//view toggle settings

test("reducer accepts VIEW_TOGGLE_SETTINGS actions", () => {

  const { viewToggleSettings } = actions;

  testReducer(viewToggleSettings(), {}, { view: { settings: true } });

});

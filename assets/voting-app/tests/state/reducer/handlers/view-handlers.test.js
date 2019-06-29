"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//global imports

const { newState } = require("schemas/voting-app");

//view clear state

test("reducer accepts VIEW_CLEAR_STATE actions", () => {

  const { viewClearState } = actions;

  testReducer(viewClearState(), { view: { add: "Option A" } }, { view: newState().view });

});

//view set add

test("reducer accepts VIEW_SET_ADD actions", () => {

  const { viewSetAdd } = actions;

  testReducer(viewSetAdd("Option A"), null, { view: { add: "Option A" } });

});

//view toggle confirm

test("reducer accepts VIEW_TOGGLE_CONFIRM actions", () => {

  const { viewToggleConfirm } = actions;

  testReducer(viewToggleConfirm(), null, { view: { confirm: true } });

});

//view toggle settings

test("reducer accepts VIEW_TOGGLE_SETTINGS actions", () => {

  const { viewToggleSettings } = actions;

  testReducer(viewToggleSettings(), { confirm: true }, {
    view: {
      settings: true,
      confirm: false
    }
  });

});

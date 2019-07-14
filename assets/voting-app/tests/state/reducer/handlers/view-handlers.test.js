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

//view toggle delete

test("reducer accepts VIEW_TOGGLE_DELETE actions", () => {

  const { viewToggleDelete } = actions;

  testReducer(viewToggleDelete(), null, { view: { delete: true } });

});

//view toggle settings

test("reducer accepts VIEW_TOGGLE_SETTINGS actions", () => {

  const { viewToggleSettings } = actions;

  testReducer(viewToggleSettings(), { delete: true }, {
    view: {
      settings: true,
      delete: false
    }
  });

});

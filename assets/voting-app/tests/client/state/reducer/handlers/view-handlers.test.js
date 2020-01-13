"use strict";

//local imports

const { newState } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//view clear state

test("reducer accepts VIEW_CLEAR_STATE actions", () => {

  const { viewClearState } = actions;

  testReducer(viewClearState(), {
    view: {
      data: [{}],
      menu: {
        settings: true,
        delete: true
      },
      body: { add: "Option A" }
    }
  }, {
    view: newState().view
  });

});

//view set add

test("reducer accepts VIEW_SET_ADD actions", () => {

  const { viewSetAdd } = actions;

  testReducer(viewSetAdd("Option A"), null, { view: { body: { add: "Option A" } } });

});

//view toggle delete

test("reducer accepts VIEW_TOGGLE_DELETE actions", () => {

  const { viewToggleDelete } = actions;

  testReducer(viewToggleDelete(), null, { view: { menu: { delete: true } } });

});

//view toggle settings

test("reducer accepts VIEW_TOGGLE_SETTINGS actions", () => {

  const { viewToggleSettings } = actions;

  testReducer(viewToggleSettings(), { view: { menu: { delete: true } } }, {
    view: {
      menu: {
        settings: true,
        delete: false
      }
    }
  });

});

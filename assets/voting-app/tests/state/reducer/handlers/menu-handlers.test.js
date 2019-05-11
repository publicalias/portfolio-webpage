"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//menu toggle confirm

test("reducer accepts MENU_TOGGLE_CONFIRM actions", () => {

  const { menuToggleConfirm } = actions;

  testReducer(menuToggleConfirm(), {}, { menu: { confirm: true } });

});

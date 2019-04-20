"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//menu set filter

test("reducer accepts MENU_SET_FILTER actions", () => {

  const { menuSetFilter } = actions;

  testReducer(menuSetFilter("created"), {}, {
    list: {
      filter: "created",
      index: 0
    }
  });

});

//menu toggle confirm

test("reducer accepts MENU_TOGGLE_CONFIRM actions", () => {

  const { menuToggleConfirm } = actions;

  testReducer(menuToggleConfirm(), {}, { menu: { confirm: true } });

});

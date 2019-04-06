"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//menu open form

test("reducer accepts MENU_OPEN_FORM actions", () => {

  const { menuOpenForm } = actions;

  testReducer(menuOpenForm(), {}, { page: "form" });

});

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

"use strict";

//local imports

const { actions } = require("../../../scripts/actions/actions");

//menu open form

test("menuOpenForm creates MENU_OPEN_FORM actions", () => {

  const { menuOpenForm } = actions;

  expect(menuOpenForm()).toEqual({ type: "MENU_OPEN_FORM" });

});

//menu set filter

test("menuSetFilter creates MENU_SET_FILTER actions", () => {

  const { menuSetFilter } = actions;

  expect(menuSetFilter("")).toEqual({
    type: "MENU_SET_FILTER",
    filter: ""
  });

});
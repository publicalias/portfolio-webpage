"use strict";

//local imports

const actions = require("../../scripts/actions/actions");
const { initialState, reducer } = require("../../scripts/reducer/reducer");

//global imports

const { deepMerge } = require("utilities");

//reducer

test("reducer accepts MENU_OPEN_FORM actions", () => {

  const { menuOpenForm } = actions;

  const nextState = deepMerge({}, initialState, { page: "form" });

  expect(reducer(initialState, menuOpenForm())).toEqual(nextState);

});

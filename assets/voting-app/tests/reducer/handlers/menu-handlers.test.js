"use strict";

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState, reducer } = require("../../../scripts/reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//reducer

test("reducer accepts MENU_OPEN_FORM actions", () => {

  const { menuOpenForm } = actions;

  const nextState = deepCopy(initialState, { page: "form" });

  expect(reducer(initialState, menuOpenForm())).toEqual(nextState);

});

test("reducer accepts MENU_TOGGLE_CONFIRM actions", () => {

  const { menuToggleConfirm } = actions;

  const nextState = deepCopy(initialState, { menu: { confirm: true } });

  expect(reducer(initialState, menuToggleConfirm())).toEqual(nextState);

});

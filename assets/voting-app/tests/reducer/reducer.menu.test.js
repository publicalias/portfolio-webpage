"use strict";

//local imports

const { actions } = require("../../scripts/actions/actions");
const { initialState, reducer } = require("../../scripts/reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//reducer

test("reducer accepts MENU_OPEN_FORM actions", () => {

  const { menuOpenForm } = actions;

  const nextState = deepCopy(initialState, { page: "form" });

  expect(reducer(initialState, menuOpenForm())).toEqual(nextState);

});

test("reducer accepts MENU_SET_FILTER actions", () => {

  const { menuSetFilter } = actions;

  const filter = "created";

  const nextState = deepCopy(initialState, { list: { filter } });

  expect(reducer(initialState, menuSetFilter(filter))).toEqual(nextState);

});

"use strict";

//local imports

const actions = require("../../scripts/actions/actions");
const { initialState, reducer } = require("../../scripts/reducer/reducer");

//global imports

const { deepCopy } = require("utilities");

//reducer

test("reducer accepts MENU_OPEN_FORM actions", () => {

  const { menuOpenForm } = actions;

  const nextState = deepCopy(initialState, { page: "form" });

  expect(reducer(initialState, menuOpenForm())).toEqual(nextState);

});

test("reducer accepts MENU_SET_FILTER actions", () => {

  const { menuSetFilter } = actions;

  const nextState = deepCopy(initialState, { list: { filter: "voted" } });

  expect(reducer(initialState, menuSetFilter("voted"))).toEqual(nextState);

});

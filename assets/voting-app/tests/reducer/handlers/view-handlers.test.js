"use strict";

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState, reducer } = require("../../../scripts/reducer/reducer");

//global imports

const { deepCopy } = require("utilities");

//view open list

test("reducer accepts VIEW_OPEN_LIST actions", () => {

  const { viewOpenList } = actions;

  const lastState = deepCopy(initialState, { page: "view" });
  const nextState = deepCopy(lastState, { page: "list" });

  expect(reducer(lastState, viewOpenList())).toEqual(nextState);

});

//view set add text

test("reducer accepts VIEW_SET_ADD_TEXT actions", () => {

  const { viewSetAddText } = actions;

  const nextState = deepCopy(initialState, { view: { add: "Option A" } });

  expect(reducer(initialState, viewSetAddText("Option A"))).toEqual(nextState);

});

//view toggle confirm

test("reducer accepts VIEW_TOGGLE_CONFIRM actions", () => {

  const { viewToggleConfirm } = actions;

  const nextState = deepCopy(initialState, { view: { confirm: true } });

  expect(reducer(initialState, viewToggleConfirm())).toEqual(nextState);

});

//view toggle settings

test("reducer accepts VIEW_TOGGLE_SETTINGS actions", () => {

  const { viewToggleSettings } = actions;

  const nextState = deepCopy(initialState, { view: { settings: true } });

  expect(reducer(initialState, viewToggleSettings())).toEqual(nextState);

});

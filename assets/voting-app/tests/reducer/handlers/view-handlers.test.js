"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState, reducer } = require("../../../scripts/reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//reducer

test("reducer accepts VIEW_OPEN_LIST actions", () => {

  const { viewOpenList } = actions;

  const lastState = deepCopy(initialState, { page: "view" });
  const nextState = deepCopy(lastState, { page: "list" });

  expect(reducer(lastState, viewOpenList())).toEqual(nextState);

});

test("reducer accepts VIEW_SET_ADD_TEXT actions", () => {

  const { viewSetAddText } = actions;

  const add = "Option A";

  const nextState = deepCopy(initialState, { view: { add } });

  expect(reducer(initialState, viewSetAddText(add))).toEqual(nextState);

});

test("reducer accepts VIEW_TOGGLE_CONFIRM actions", () => {

  const { viewToggleConfirm } = actions;

  const nextState = deepCopy(initialState, { view: { confirm: true } });

  expect(reducer(initialState, viewToggleConfirm())).toEqual(nextState);

});

test("reducer accepts VIEW_TOGGLE_SETTINGS actions", () => {

  const { viewToggleSettings } = actions;

  const nextState = deepCopy(initialState, { view: { settings: true } });

  expect(reducer(initialState, viewToggleSettings())).toEqual(nextState);

});

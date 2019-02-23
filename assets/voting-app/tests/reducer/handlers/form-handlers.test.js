"use strict";

//local imports

const { actions } = require("../../../scripts/actions/actions");
const { initialState, reducer } = require("../../../scripts/reducer/reducer");

//global imports

const { deepCopy } = require("utilities");

//form discard poll

test("reducer accepts FORM_DISCARD_POLL actions", () => {

  const { formDiscardPoll } = actions;

  const lastState = deepCopy(initialState, { form: { title: "Title A" } });
  const nextState = deepCopy(lastState, initialState.form);

  expect(reducer(lastState, formDiscardPoll())).toEqual(nextState);

});

//form remove option

test("reducer accepts FORM_REMOVE_OPTION actions", () => {

  const { formRemoveOption } = actions;

  const lastState = deepCopy(initialState, { form: { options: [{ text: "" }] } });
  const nextState = deepCopy(lastState, { form: { options: [] } });

  expect(reducer(lastState, formRemoveOption(""))).toEqual(nextState);

});

//form set add text

test("reducer accepts FORM_SET_ADD_TEXT actions", () => {

  const { formSetAddText } = actions;

  const nextState = deepCopy(initialState, { form: { add: "Option A" } });

  expect(reducer(initialState, formSetAddText("Option A"))).toEqual(nextState);

});

//form set title text

test("reducer accepts FORM_SET_TITLE_TEXT actions", () => {

  const { formSetTitleText } = actions;

  const nextState = deepCopy(initialState, { form: { title: "Title A" } });

  expect(reducer(initialState, formSetTitleText("Title A"))).toEqual(nextState);

});

//form toggle confirm

test("reducer accepts FORM_TOGGLE_CONFIRM actions", () => {

  const { formToggleConfirm } = actions;

  const nextState = deepCopy(initialState, { form: { confirm: true } });

  expect(reducer(initialState, formToggleConfirm())).toEqual(nextState);

});

//form toggle private

test("reducer accepts FORM_TOGGLE_PRIVATE actions", () => {

  const { formTogglePrivate } = actions;

  const nextState = deepCopy(initialState, { form: { private: true } });

  expect(reducer(initialState, formTogglePrivate())).toEqual(nextState);

});

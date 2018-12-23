"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../scripts/actions/actions");
const { initialState, reducer } = require("../../scripts/reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//reducer

test("reducer accepts FORM_DISCARD_POLL actions", () => {

  const { formDiscardPoll } = actions;

  const lastState = deepCopy(initialState, { form: { title: "Title A" } });
  const nextState = deepCopy(lastState, initialState.form);

  expect(reducer(lastState, formDiscardPoll())).toEqual(nextState);

});

test("reducer accepts FORM_REMOVE_OPTION actions", () => {

  const { formRemoveOption } = actions;

  const lastState = deepCopy(initialState, { form: { options: [{ text: "Option A" }] } });
  const nextState = deepCopy(lastState, { form: { options: [] } });

  expect(reducer(lastState, formRemoveOption(0))).toEqual(nextState);

});

test("reducer accepts FORM_SET_ADD_TEXT actions", () => {

  const { formSetAddText } = actions;

  const add = "Option A";

  const nextState = deepCopy(initialState, { form: { add } });

  expect(reducer(initialState, formSetAddText(add))).toEqual(nextState);

});

test("reducer accepts FORM_SET_TITLE_TEXT actions", () => {

  const { formSetTitleText } = actions;

  const title = "Title A";

  const nextState = deepCopy(initialState, { form: { title } });

  expect(reducer(initialState, formSetTitleText(title))).toEqual(nextState);

});

test("reducer accepts FORM_TOGGLE_CONFIRM actions", () => {

  const { formToggleConfirm } = actions;

  const nextState = deepCopy(initialState, { form: { confirm: true } });

  expect(reducer(initialState, formToggleConfirm())).toEqual(nextState);

});

test("reducer accepts FORM_TOGGLE_PRIVATE actions", () => {

  const { formTogglePrivate } = actions;

  const nextState = deepCopy(initialState, { form: { private: true } });

  expect(reducer(initialState, formTogglePrivate())).toEqual(nextState);

});

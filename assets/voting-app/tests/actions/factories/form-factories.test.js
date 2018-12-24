"use strict";

//local imports

const { actions } = require("../../../scripts/actions/actions");

//form discard poll

test("formDiscardPoll creates FORM_DISCARD_POLL actions", () => {

  const { formDiscardPoll } = actions;

  expect(formDiscardPoll()).toEqual({ type: "FORM_DISCARD_POLL" });

});

//form remove option

test("formRemoveOption creates FORM_REMOVE_OPTION actions", () => {

  const { formRemoveOption } = actions;

  expect(formRemoveOption(0)).toEqual({
    type: "FORM_REMOVE_OPTION",
    index: 0
  });

});

//form set add text

test("formSetAddText creates FORM_SET_ADD_TEXT actions", () => {

  const { formSetAddText } = actions;

  expect(formSetAddText("")).toEqual({
    type: "FORM_SET_ADD_TEXT",
    add: ""
  });

});

//form set title text

test("formSetTitleText creates FORM_SET_TITLE_TEXT actions", () => {

  const { formSetTitleText } = actions;

  expect(formSetTitleText("")).toEqual({
    type: "FORM_SET_TITLE_TEXT",
    title: ""
  });

});

//form toggle confirm

test("formToggleConfirm creates FORM_TOGGLE_CONFIRM actions", () => {

  const { formToggleConfirm } = actions;

  expect(formToggleConfirm()).toEqual({ type: "FORM_TOGGLE_CONFIRM" });

});

//form toggle private

test("formTogglePrivate creates FORM_TOGGLE_PRIVATE actions", () => {

  const { formTogglePrivate } = actions;

  expect(formTogglePrivate()).toEqual({ type: "FORM_TOGGLE_PRIVATE" });

});

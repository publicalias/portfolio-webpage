"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");

//form add option

test("formAddOption creates FORM_ADD_OPTION actions", () => {

  const { formAddOption } = actions;

  expect(formAddOption()).toEqual({ type: "FORM_ADD_OPTION" });

});

//form discard poll

test("formDiscardPoll creates FORM_DISCARD_POLL actions", () => {

  const { formDiscardPoll } = actions;

  expect(formDiscardPoll()).toEqual({ type: "FORM_DISCARD_POLL" });

});

//form remove option

test("formRemoveOption creates FORM_REMOVE_OPTION actions", () => {

  const { formRemoveOption } = actions;

  expect(formRemoveOption("")).toEqual({
    type: "FORM_REMOVE_OPTION",
    text: ""
  });

});

//form set add

test("formSetAdd creates FORM_SET_ADD actions", () => {

  const { formSetAdd } = actions;

  expect(formSetAdd("")).toEqual({
    type: "FORM_SET_ADD",
    add: ""
  });

});

//form set title

test("formSetTitle creates FORM_SET_TITLE actions", () => {

  const { formSetTitle } = actions;

  expect(formSetTitle("")).toEqual({
    type: "FORM_SET_TITLE",
    title: ""
  });

});

//form toggle confirm

test("formToggleConfirm creates FORM_TOGGLE_CONFIRM actions", () => {

  const { formToggleConfirm } = actions;

  expect(formToggleConfirm()).toEqual({ type: "FORM_TOGGLE_CONFIRM" });

});

//form toggle secret

test("formToggleSecret creates FORM_TOGGLE_SECRET actions", () => {

  const { formToggleSecret } = actions;

  expect(formToggleSecret()).toEqual({ type: "FORM_TOGGLE_SECRET" });

});

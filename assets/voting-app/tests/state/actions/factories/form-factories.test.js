"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");

//form add option

test("formAddOption creates FORM_ADD_OPTION actions", () => {

  const { formAddOption } = actions;

  expect(formAddOption()).toEqual({ type: "FORM_ADD_OPTION" });

});

//form clear state

test("formClearState creates FORM_CLEAR_STATE actions", () => {

  const { formClearState } = actions;

  expect(formClearState()).toEqual({ type: "FORM_CLEAR_STATE" });

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

//form toggle delete

test("formToggleDelete creates FORM_TOGGLE_DELETE actions", () => {

  const { formToggleDelete } = actions;

  expect(formToggleDelete()).toEqual({ type: "FORM_TOGGLE_DELETE" });

});

//form toggle secret

test("formToggleSecret creates FORM_TOGGLE_SECRET actions", () => {

  const { formToggleSecret } = actions;

  expect(formToggleSecret()).toEqual({ type: "FORM_TOGGLE_SECRET" });

});

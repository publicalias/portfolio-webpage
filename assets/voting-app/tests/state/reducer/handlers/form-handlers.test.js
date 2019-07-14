"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//global imports

const { newState } = require("schemas/voting-app");

//form add option

test("reducer accepts FORM_ADD_OPTION actions", () => {

  const { formAddOption } = actions;

  testReducer(formAddOption(), { form: { add: "Option A" } }, { form: { options: ["Option A"] } });

});

//form clear state

test("reducer accepts FORM_CLEAR_STATE actions", () => {

  const { formClearState } = actions;

  testReducer(formClearState(), { form: { title: "Title A" } }, { form: newState().form });

});

//form remove option

test("reducer accepts FORM_REMOVE_OPTION actions", () => {

  const { formRemoveOption } = actions;

  testReducer(formRemoveOption(""), { form: { options: [""] } }, { form: { options: [] } });

});

//form set add

test("reducer accepts FORM_SET_ADD actions", () => {

  const { formSetAdd } = actions;

  testReducer(formSetAdd("Option A"), null, { form: { add: "Option A" } });

});

//form set title

test("reducer accepts FORM_SET_TITLE actions", () => {

  const { formSetTitle } = actions;

  testReducer(formSetTitle("Title A"), null, { form: { title: "Title A" } });

});

//form toggle delete

test("reducer accepts FORM_TOGGLE_DELETE actions", () => {

  const { formToggleDelete } = actions;

  testReducer(formToggleDelete(), null, { form: { delete: true } });

});

//form toggle secret

test("reducer accepts FORM_TOGGLE_SECRET actions", () => {

  const { formToggleSecret } = actions;

  testReducer(formToggleSecret(), null, { form: { secret: true } });

});

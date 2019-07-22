"use strict";

//local imports

const { newState } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

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

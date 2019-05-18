"use strict";

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//global imports

const { newState } = require("schemas/voting-app");

//form add option

test("reducer accepts FORM_ADD_OPTION actions", () => {

  const { formAddOption } = actions;

  testReducer(formAddOption(), { form: { add: "Option A" } }, {
    form: {
      options: ["Option A"],
      add: ""
    }
  });

});

//form discard poll

test("reducer accepts FORM_DISCARD_POLL actions", () => {

  const { formDiscardPoll } = actions;

  testReducer(formDiscardPoll(), { form: { title: "Title A" } }, { form: newState().form });

});

//form remove option

test("reducer accepts FORM_REMOVE_OPTION actions", () => {

  const { formRemoveOption } = actions;

  testReducer(formRemoveOption(""), { form: { options: [""] } }, { form: { options: [] } });

});

//form set add

test("reducer accepts FORM_SET_ADD actions", () => {

  const { formSetAdd } = actions;

  testReducer(formSetAdd("Option A"), {}, { form: { add: "Option A" } });

});

//form set title

test("reducer accepts FORM_SET_TITLE actions", () => {

  const { formSetTitle } = actions;

  testReducer(formSetTitle("Title A"), {}, { form: { title: "Title A" } });

});

//form toggle confirm

test("reducer accepts FORM_TOGGLE_CONFIRM actions", () => {

  const { formToggleConfirm } = actions;

  testReducer(formToggleConfirm(), {}, { form: { confirm: true } });

});

//form toggle secret

test("reducer accepts FORM_TOGGLE_SECRET actions", () => {

  const { formToggleSecret } = actions;

  testReducer(formToggleSecret(), {}, { form: { secret: true } });

});

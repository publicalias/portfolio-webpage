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

//form set add text

test("reducer accepts FORM_SET_ADD_TEXT actions", () => {

  const { formSetAddText } = actions;

  testReducer(formSetAddText("Option A"), {}, { form: { add: "Option A" } });

});

//form set title text

test("reducer accepts FORM_SET_TITLE_TEXT actions", () => {

  const { formSetTitleText } = actions;

  testReducer(formSetTitleText("Title A"), {}, { form: { title: "Title A" } });

});

//form toggle confirm

test("reducer accepts FORM_TOGGLE_CONFIRM actions", () => {

  const { formToggleConfirm } = actions;

  testReducer(formToggleConfirm(), {}, { form: { confirm: true } });

});

//form toggle private

test("reducer accepts FORM_TOGGLE_PRIVATE actions", () => {

  const { formTogglePrivate } = actions;

  testReducer(formTogglePrivate(), {}, { form: { private: true } });

});

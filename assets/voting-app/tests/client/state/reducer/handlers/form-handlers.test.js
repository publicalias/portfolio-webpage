"use strict";

//local imports

const { newState } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//form clear state

test("reducer accepts FORM_CLEAR_STATE actions", () => {

  const { formClearState } = actions;

  testReducer(formClearState(), {
    form: {
      menu: {
        secret: true,
        delete: true
      },
      body: {
        title: "Title A",
        options: ["Option A"],
        add: "Option B"
      }
    }
  }, {
    form: newState().form
  });

});

//form remove option

test("reducer accepts FORM_REMOVE_OPTION actions", () => {

  const { formRemoveOption } = actions;

  testReducer(formRemoveOption("Option A"), { form: { body: { options: ["Option A"] } } }, { form: { body: { options: [] } } });

});

//form set add

test("reducer accepts FORM_SET_ADD actions", () => {

  const { formSetAdd } = actions;

  testReducer(formSetAdd("Option A"), null, { form: { body: { add: "Option A" } } });

});

//form set title

test("reducer accepts FORM_SET_TITLE actions", () => {

  const { formSetTitle } = actions;

  testReducer(formSetTitle("Option A"), null, { form: { body: { title: "Option A" } } });

});

//form toggle delete

test("reducer accepts FORM_TOGGLE_DELETE actions", () => {

  const { formToggleDelete } = actions;

  testReducer(formToggleDelete(), null, { form: { menu: { delete: true } } });

});

//form toggle secret

test("reducer accepts FORM_TOGGLE_SECRET actions", () => {

  const { formToggleSecret } = actions;

  testReducer(formToggleSecret(), null, { form: { menu: { secret: true } } });

});

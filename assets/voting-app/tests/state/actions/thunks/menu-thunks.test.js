"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { initialState } = require("../../../../scripts/state/reducer/reducer");
const { testThunk } = require("../../../test-helpers");

//global imports

const { initHistory } = require("test-helpers/client-tests");

//menu open form

describe("menuOpenForm", () => {

  const { menuOpenForm, metaSetState } = actions;

  const { history, testHistory } = initHistory();

  const action = menuOpenForm(history);

  it("dispatches META_SET_STATE action", () => {

    testThunk(action, [metaSetState({ form: initialState.form })]);

    testHistory(["/voting-app/form"]);

  });

});

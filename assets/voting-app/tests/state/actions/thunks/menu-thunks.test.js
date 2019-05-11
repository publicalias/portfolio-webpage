"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testThunk } = require("../../../test-helpers");

//global imports

const { newState } = require("schemas/voting-app");
const { initHistory } = require("test-helpers/redux-tests");
const { deepCopy } = require("utilities");

//menu open form

describe("menuOpenForm", () => {

  const { menuOpenForm, metaSetState } = actions;

  const { history, testHistory } = initHistory();

  const action = menuOpenForm(history);

  it("dispatches META_SET_STATE action", () => {

    testThunk(action, [metaSetState({ form: newState().form })]);

    testHistory(["/form"]);

  });

});

describe("menuSetFilter", () => {

  const { menuSetFilter, metaSetState } = actions;

  const { history, testHistory } = initHistory();

  const action = menuSetFilter("created", history);

  it("dispatches META_SET_STATE action", () => {

    testThunk(action, [metaSetState({ list: deepCopy(newState().list, { filter: "created" }) })]);

    testHistory(["/list"]);

  });

});

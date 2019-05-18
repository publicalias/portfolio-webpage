"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const { actions } = require("../../../../scripts/state/actions/actions");
const { testThunk } = require("../../../test-helpers");

//global imports

const { newState } = require("schemas/voting-app");
const { initHistory } = require("test-helpers/redux-tests");
const { deepCopy } = require("utilities");

//list set filter

describe("listSetFilter", () => {

  const { listSetFilter, metaSetState } = actions;

  const { history, testHistory } = initHistory();

  const action = listSetFilter("created", history);

  it("dispatches META_SET_STATE action", () => {

    testThunk(action, [metaSetState({ list: deepCopy(newState().list, { filter: "created" }) })]);

    testHistory(["/list"]);

  });

});

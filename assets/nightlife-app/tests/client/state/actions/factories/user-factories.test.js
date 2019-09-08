"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");

//user clear state

test("userClearState creates USER_CLEAR_STATE actions", () => {

  const { userClearState } = actions;

  expect(userClearState()).toEqual({ type: "USER_CLEAR_STATE" });

});

//user set search

test("userSetSearch creates USER_SET_SEARCH actions", () => {

  const { userSetSearch } = actions;

  expect(userSetSearch("")).toEqual({
    type: "USER_SET_SEARCH",
    search: ""
  });

});

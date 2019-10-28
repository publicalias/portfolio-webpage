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

//user toggle range

test("userToggleRange creates USER_TOGGLE_RANGE actions", () => {

  const { userToggleRange } = actions;

  expect(userToggleRange()).toEqual({ type: "USER_TOGGLE_RANGE" });

});

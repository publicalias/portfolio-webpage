"use strict";

//local imports

const { newState } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//user clear state

test("reducer accepts USER_CLEAR_STATE actions", () => {

  const { userClearState } = actions;

  testReducer(userClearState(), {
    users: {
      list: {
        data: [{}],
        menu: {
          range: true,
          search: "User A"
        }
      },
      page: { data: [{}] }
    }
  }, {
    users: newState().users
  });

});

//user set search

test("reducer accepts USER_SET_SEARCH actions", () => {

  const { userSetSearch } = actions;

  testReducer(userSetSearch("User A"), null, { users: { list: { menu: { search: "User A" } } } });

});

//user toggle range

test("reducer accepts USER_TOGGLE_RANGE actions", () => {

  const { userToggleRange } = actions;

  testReducer(userToggleRange(), null, { users: { list: { menu: { range: true } } } });

});

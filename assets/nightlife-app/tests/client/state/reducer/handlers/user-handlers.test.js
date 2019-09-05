"use strict";

//local imports

const { newState } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//user clear state

test("reducer accepts USER_CLEAR_STATE actions", () => {

  const { userClearState } = actions;

  testReducer(userClearState(), {
    page: { users: [{}] },
    users: {
      list: {
        name: "User A",
        zipCode: "12345"
      }
    }
  }, {
    page: { users: [] },
    users: newState().users
  });

});

//user set name

test("reducer accepts USER_SET_NAME actions", () => {

  const { userSetName } = actions;

  testReducer(userSetName("User A"), null, { users: { list: { name: "User A" } } });

});

//user set zip code

test("reducer accepts USER_SET_ZIP_CODE actions", () => {

  const { userSetZipCode } = actions;

  testReducer(userSetZipCode("12345"), null, { users: { list: { zipCode: "12345" } } });

});

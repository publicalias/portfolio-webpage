"use strict";

//local imports

const { newState } = require("../../../../../schemas");

//global imports

const { deepCopy } = require("all/utilities");

//user clear state

const USER_CLEAR_STATE = (state) => deepCopy(state, {
  page: { users: [] },
  users: newState().users
});

//user set name

const USER_SET_NAME = (state, { name }) => deepCopy(state, { users: { list: { name } } });

//user set zip code

const USER_SET_ZIP_CODE = (state, { zipCode }) => deepCopy(state, { users: { list: { zipCode } } });

//exports

module.exports = {
  USER_CLEAR_STATE,
  USER_SET_NAME,
  USER_SET_ZIP_CODE
};

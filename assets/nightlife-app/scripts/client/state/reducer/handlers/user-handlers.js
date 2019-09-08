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

//user set search

const USER_SET_SEARCH = (state, { search }) => deepCopy(state, { users: { list: { search } } });

//exports

module.exports = {
  USER_CLEAR_STATE,
  USER_SET_SEARCH
};

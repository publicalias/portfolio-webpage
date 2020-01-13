"use strict";

//local imports

const { newState } = require("../../../../../schemas");

//global imports

const { deepCopy } = require("all/utilities");

//user clear state

const USER_CLEAR_STATE = (state) => deepCopy(state, { users: newState().users });

//user set search

const USER_SET_SEARCH = (state, { search }) => deepCopy(state, { users: { list: { menu: { search } } } });

//user toggle range

const USER_TOGGLE_RANGE = (state) => deepCopy(state, { users: { list: { menu: { range: !state.users.list.menu.range } } } });

//exports

module.exports = {
  USER_CLEAR_STATE,
  USER_SET_SEARCH,
  USER_TOGGLE_RANGE
};

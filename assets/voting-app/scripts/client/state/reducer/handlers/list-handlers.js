"use strict";

//local imports

const { newState } = require("../../../../../schemas");

//global imports

const { deepCopy } = require("all/utilities");

//list clear state

const LIST_CLEAR_STATE = (state) => deepCopy(state, { list: newState().list });

//list set search

const LIST_SET_SEARCH = (state, { search }) => deepCopy(state, { list: { search } });

//exports

module.exports = {
  LIST_CLEAR_STATE,
  LIST_SET_SEARCH
};

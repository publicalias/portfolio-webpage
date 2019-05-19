"use strict";

//global imports

const { newState } = require("schemas/voting-app");
const { deepCopy } = require("utilities");

//list clear state

const LIST_CLEAR_STATE = (state) => deepCopy(state, { list: newState().list });

//list set search

const LIST_SET_SEARCH = (state, { search }) => deepCopy(state, { list: { search } });

//exports

module.exports = {
  LIST_CLEAR_STATE,
  LIST_SET_SEARCH
};

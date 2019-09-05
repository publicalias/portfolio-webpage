"use strict";

//local imports

const { newState } = require("../../schemas");
const { reducer } = require("../../scripts/client/state/reducer/reducer");

//global imports

const { initTestAPI, initTestReducer } = require("redux/tests/redux-tests");

//test api

const testAPI = initTestAPI(newState);

//test reducer

const testReducer = initTestReducer(newState, reducer);

//exports

module.exports = {
  testAPI,
  testReducer
};

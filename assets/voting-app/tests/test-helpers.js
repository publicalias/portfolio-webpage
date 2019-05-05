"use strict";

//local imports

const { reducer } = require("../scripts/state/reducer/reducer");

//global imports

const { newState } = require("schemas/voting-app");
const { initTestAPI, initTestReducer, initTestThunk } = require("test-helpers/redux-tests");

//test api

const testAPI = initTestAPI(newState);

//test reducer

const testReducer = initTestReducer(newState, reducer);

//test thunk

const testThunk = initTestThunk(newState);

//exports

module.exports = {
  testAPI,
  testReducer,
  testThunk
};

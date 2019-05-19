"use strict";

//local imports

const { actions } = require("../scripts/state/actions/actions");
const { reducer } = require("../scripts/state/reducer/reducer");

//global imports

const { newState } = require("schemas/voting-app");
const { initTestWrapper } = require("test-helpers/react-tests");
const { initTestAPI, initTestReducer } = require("test-helpers/redux-tests");

//test api

const testAPI = initTestAPI(newState);

//test reducer

const testReducer = initTestReducer(newState, reducer);

//test wrapper

const testWrapper = initTestWrapper(newState, actions);

//exports

module.exports = {
  testAPI,
  testReducer,
  testWrapper
};

"use strict";

//local imports

const { actions } = require("../scripts/state/actions/actions");
const { initialState, reducer } = require("../scripts/state/reducer/reducer");

//global imports

const { initTestAPI, initTestReducer, initTestThunk } = require("test-helpers/client-tests");

//test api

const { metaAddErrors } = actions;

const getActionList = (status) => [metaAddErrors([status])];

const testAPI = initTestAPI(getActionList, initialState);

//test reducer

const testReducer = initTestReducer(initialState, reducer);

//test thunk

const testThunk = initTestThunk(initialState);

//exports

module.exports = {
  testAPI,
  testReducer,
  testThunk
};

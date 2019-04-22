"use strict";

//local imports

const { actions } = require("../scripts/state/actions/actions");
const { reducer } = require("../scripts/state/reducer/reducer");

//global imports

const { initTestAPI, initTestReducer, initTestThunk } = require("client-tests");
const { newState } = require("schemas/voting-app");

//test api

const { metaAddErrors } = actions;

const getActionList = (status) => [metaAddErrors([status])];

const testAPI = initTestAPI(getActionList, newState());

//test reducer

const testReducer = initTestReducer(newState(), reducer);

//test thunk

const testThunk = initTestThunk(newState());

//exports

module.exports = {
  testAPI,
  testReducer,
  testThunk
};

"use strict";

//local imports

const { actions } = require("../scripts/state/actions/actions");
const { reducer } = require("../scripts/state/reducer/reducer");

//global imports

const { newState } = require("schemas/voting-app");
const { initMockProps } = require("test-helpers/react-tests");
const { initTestAPI, initTestReducer, initTestThunk } = require("test-helpers/redux-tests");

//mock props

const mockProps = initMockProps(newState, actions);

//test api

const testAPI = initTestAPI(newState);

//test reducer

const testReducer = initTestReducer(newState, reducer);

//test thunk

const testThunk = initTestThunk(newState);

//exports

module.exports = {
  mockProps,
  testAPI,
  testReducer,
  testThunk
};

"use strict";

//local imports

const { newGeoPoint, newState } = require("../../schemas");
const { actions } = require("../../scripts/client/state/actions/actions");
const { reducer } = require("../../scripts/client/state/reducer/reducer");

//global imports

const { initTestWrapper } = require("redux/tests/react-tests");
const { initTestAPI, initTestReducer } = require("redux/tests/redux-tests");

//get geo point

const getGeoPoint = (x, y = x) => newGeoPoint({ coordinates: [x, y] });

//test api

const testAPI = initTestAPI(newState);

//test reducer

const testReducer = initTestReducer(newState, reducer);

//test wrapper

const testWrapper = initTestWrapper(newState, actions);

//exports

module.exports = {
  getGeoPoint,
  testAPI,
  testReducer,
  testWrapper
};

"use strict";

//local imports

const { actions } = require("../scripts/state/actions/actions");
const { reducer } = require("../scripts/state/reducer/reducer");

//global imports

const { newListParams, newState } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { initTestWrapper } = require("test-helpers/react-tests");
const { initTestAPI, initTestReducer } = require("test-helpers/redux-tests");

//test api

const testAPI = initTestAPI(newState);

//test reducer

const testReducer = initTestReducer(newState, reducer);

//test reload

const testReload = async (render, qa, action, args, list) => {

  const { props, wrapper } = render;

  const { actions: { metaGetPolls, metaGetUser }, poll: { id } } = props;

  wrapper.find(qa).simulate("click"); //async

  await Promise.resolve();

  testMock(props.actions[action], args);

  testMock(metaGetUser, []);
  testMock(metaGetPolls, list ? [newListParams(), null, 0] : [null, id]);

  wrapper.unmount();

};

//test wrapper

const testWrapper = initTestWrapper(newState, actions);

//exports

module.exports = {
  testAPI,
  testReducer,
  testReload,
  testWrapper
};

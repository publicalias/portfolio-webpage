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

//test create delete

const testCreateDelete = async (props, wrapper, qa, fn, args, res) => {

  const { history } = props;

  wrapper.find(qa).simulate("click"); //async

  await Promise.resolve();

  testMock(fn, args);

  if (res && !res.errors) {
    testMock(history.push, ["/list?filter=created"]);
  }

  wrapper.unmount();

};

//test reducer

const testReducer = initTestReducer(newState, reducer);

//test reload

const testReload = async (props, wrapper, qa, type, args, list) => {

  const { actions: { metaGetPolls, metaGetUser }, local: { poll } } = props;

  wrapper.find(qa).simulate("click"); //async

  await Promise.resolve();

  testMock(props.actions[type], args);

  testMock(metaGetUser, []);
  testMock(metaGetPolls, list ? [newListParams(), null, 0] : [null, poll.id]);

  wrapper.unmount();

};

//test wrapper

const testWrapper = initTestWrapper(newState, actions);

//exports

module.exports = {
  testAPI,
  testCreateDelete,
  testReducer,
  testReload,
  testWrapper
};

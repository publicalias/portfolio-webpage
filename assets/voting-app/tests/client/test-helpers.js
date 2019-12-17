"use strict";

//local imports

const { newState } = require("../../schemas");
const { actions } = require("../../scripts/client/state/actions/actions");
const { reducer } = require("../../scripts/client/state/reducer/reducer");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestWrapper } = require("redux/tests/react-tests");
const { initTestAPI, initTestReducer } = require("redux/tests/redux-tests");

//test api

const testAPI = initTestAPI(newState);

//test create delete

const testCreateDelete = async (render, dataList, qa, res, [type, args]) => {

  const { props, wrapper } = render(...dataList);

  const { history } = props;

  props.actions[type].mockReturnValueOnce(res);

  wrapper.find(qa).simulate("click"); //async

  await Promise.resolve();

  testMock(props.actions[type], args);

  if (res && !res.errors) {
    testMock(history.push, ["/list?filter=created"]);
  }

  wrapper.unmount();

};

//test reducer

const testReducer = initTestReducer(newState, reducer);

//test wrapper

const testWrapper = initTestWrapper(newState, actions);

//exports

module.exports = {
  testAPI,
  testCreateDelete,
  testReducer,
  testWrapper
};

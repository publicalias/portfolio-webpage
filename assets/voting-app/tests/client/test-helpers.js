"use strict";

//local imports

const { newForm, newListParams, newPoll, newState } = require("../../schemas");
const { actions } = require("../../scripts/client/state/actions/actions");
const { reducer } = require("../../scripts/client/state/reducer/reducer");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { initTestEvent, initTestWrapper } = require("test-helpers/react-tests");
const { initTestAPI, initTestReducer } = require("test-helpers/redux-tests");
const { deepCopy } = require("utilities");

//init test poll

const initTestPoll = (render, role) => (data, pollData, local, other) => {

  const init = {
    poll: role === "form" ? newForm(pollData) : newPoll(pollData),
    role
  };

  return render(data, deepCopy(init, local), other);

};

//init test reload / test reload

const initTestReload = (type, event) => (render, dataList, qa, id, ...fnList) => {

  const testClick = initTestEvent(render, type, event);

  const fullList = fnList.concat([
    ["metaGetUser", []],
    ["metaGetPolls", id ? [null, id] : [newListParams(), null, 0]]
  ]);

  return testClick(qa, dataList, ...fullList);

};

const testReload = initTestReload("click");

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
  initTestPoll,
  initTestReload,
  testAPI,
  testCreateDelete,
  testReducer,
  testReload,
  testWrapper
};

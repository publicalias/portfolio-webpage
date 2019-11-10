"use strict";

//local imports

const { newForm, newListParams, newPoll, newState } = require("../../schemas");
const { actions } = require("../../scripts/client/state/actions/actions");
const { reducer } = require("../../scripts/client/state/reducer/reducer");

//global imports

const { deepCopy } = require("all/utilities");
const { initTestEvent } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { initTestWrapper } = require("redux/tests/react-tests");
const { initTestAPI, initTestReducer } = require("redux/tests/redux-tests");

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
    id ? ["metaGetPollItem", [id]] : ["metaGetPollList", [newListParams(), 0]]
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

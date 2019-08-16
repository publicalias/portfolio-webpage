"use strict";

//local imports

const { newForm, newListParams, newPoll, newState } = require("../../schemas");
const { actions } = require("../../scripts/client/state/actions/actions");
const { reducer } = require("../../scripts/client/state/reducer/reducer");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { initTestEvent, initTestWrapper } = require("test-helpers/react-tests");
const { initTestAPI, initTestReducer } = require("test-helpers/redux-tests");

//init test poll

const initTestPoll = (render, role) => (data, pollData, other, list) => { //supports all poll components

  const local = {
    poll: role === "form" ? newForm(pollData) : newPoll(pollData),
    role,
    list
  };

  return render(data, local, other);

};

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

//test reload

const testReload = (render, dataList, qa, id, ...fnList) => {

  const testClick = initTestEvent(render, "click");

  const fullList = fnList.concat([
    ["metaGetUser", []],
    ["metaGetPolls", id ? [null, id] : [newListParams(), null, 0]]
  ]);

  return testClick(qa, dataList, ...fullList);

};

//test wrapper

const testWrapper = initTestWrapper(newState, actions);

//exports

module.exports = {
  initTestPoll,
  testAPI,
  testCreateDelete,
  testReducer,
  testReload,
  testWrapper
};

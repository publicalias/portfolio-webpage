"use strict";

const { initDeepCopy } = require("all/utilities");
const { testMock } = require("redux/tests/meta-tests");

//init test event

const initTestEvent = (render, type, event) => async (qa, dataList, ...fnList) => {

  const { props, wrapper } = render(...dataList);

  wrapper.find(qa).simulate(type, event);

  await Promise.resolve(); //supports simple async events

  for (const e of fnList) {
    if (typeof e === "function") {
      e(props);
    } else {
      (([type, ...calls]) => {
        testMock(props.actions[type], ...calls);
      })(e);
    }
  }

  wrapper.unmount();

};

//init test snapshot

const initTestSnapshot = (render) => (data, local, other) => {

  const { wrapper } = render(data, local, other);

  expect(wrapper).toMatchSnapshot();

};

//mock infinite scroll

const mockInfiniteScroll = (handleReload = jest.fn(), handleScroll = jest.fn()) => ({
  handleReload,
  handleScroll,
  lib: {
    useInfiniteScroll: jest.fn(() => ({
      handleReload,
      handleScroll
    }))
  }
});

//test submit

const testSubmit = (event, label) => (testSubmit) => {

  it(`should call ${label} on ${event} (failure)`, testSubmit());

  it(`should call ${label} on ${event} (errors)`, testSubmit({ errors: [] }));

  it(`should call ${label} on ${event} (success)`, testSubmit({}));

};

//with data list

const withDataList = (render, dataList) => (...args) => {

  const deepCopy = initDeepCopy({
    ignoreNull: true, //prevents overwriting
    ignoreUndefined: true,
    overwriteArray: false
  });

  const fullDataList = deepCopy(dataList, args);

  return render(...fullDataList);

};

//exports

module.exports = {
  initTestEvent,
  initTestSnapshot,
  mockInfiniteScroll,
  testSubmit,
  withDataList
};

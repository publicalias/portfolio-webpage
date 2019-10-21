"use strict";

//local imports

const MetaList = require("../../../../../scripts/client/components/notifications/meta/meta-list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//node modules

const React = require("react");

//utilities

const { testMount, testShallow } = testWrapper(MetaList);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(MetaList));

//meta list

describe("meta list", () => {

  const dataList = [null, {
    heading: "Meta",
    list: [],
    type: "meta"
  }];

  const testList = withDataList(initTestSnapshot(testShallow), dataList);
  const testListMount = withDataList(testMount, dataList);

  const testClick = initTestEvent(testListMount, "click");

  it("should match snapshot (default)", () => testList());

  it("should match snapshot (list)", () => testList(null, { list: [<div key="" />] }));

  it("should call refresh on load", () => {

    const refresh = jest.fn();

    const { wrapper } = testListMount(null, { refresh });

    wrapper.mount();

    testMock(refresh, []);

    wrapper.unmount();

  });

  it("should call refresh on click", () => {

    const refresh = jest.fn();

    return testClick(".qa-refresh-list", [null, { refresh }], () => {
      testMock(refresh, [], []);
    });

  });

});

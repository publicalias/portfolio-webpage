"use strict";

//local imports

const MetaList = require("../../../../../scripts/client/components/notifications/meta/meta-list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//node modules

const React = require("react");

//utilities

const { testMount, testShallow } = testWrapper(MetaList);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(MetaList));

//meta list

describe("MetaList", () => {

  const dataList = [null, {
    bool: "[]",
    heading: "Meta",
    type: "meta"
  }, {
    children: []
  }];

  const testList = withDataList(testShallow, dataList);
  const testListMount = withDataList(testMount, dataList);

  const testSnapshot = initTestSnapshot(testList);

  const testClick = initTestEvent(testList, "click");

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (list)", () => testSnapshot(null, null, { children: [<div key="" />] }));

  it("should call refresh conditionally on update", () => {

    const refresh = jest.fn();

    const { setProps, wrapper } = testListMount(null, { refresh });

    wrapper.mount();

    setProps(null, null, { location: { pathname: "/users/list" } });

    testMock(refresh, [], []);

    wrapper.unmount();

  });

  it("should call handleClick on click", () => {

    const refresh = jest.fn();

    return testClick(".qa-refresh-list", [null, { refresh }], () => {
      testMock(refresh, []);
    });

  });

});

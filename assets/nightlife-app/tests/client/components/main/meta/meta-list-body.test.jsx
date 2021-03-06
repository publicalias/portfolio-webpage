"use strict";

//local imports

const MetaListBody = require("../../../../../scripts/client/components/main/meta/meta-list-body");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//node modules

const React = require("react");

//utilities

const { testShallow } = testWrapper(MetaListBody);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(MetaListBody));

//meta list body

describe("MetaListBody", () => {

  const testList = withDataList(testShallow, [null, {
    handleScroll: jest.fn(),
    header: <div />
  }, {
    children: []
  }]);

  const testSnapshot = initTestSnapshot(testList);

  const testScroll = initTestEvent(testList, "scroll", {});

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (list)", () => testSnapshot(null, null, { children: [<div key="" />] }));

  it("should call handleScroll on scroll", () => {

    const handleScroll = jest.fn();

    return testScroll(".qa-ref-scroll", [null, { handleScroll }], () => {
      testMock(handleScroll, [{}]);
    });

  });

});

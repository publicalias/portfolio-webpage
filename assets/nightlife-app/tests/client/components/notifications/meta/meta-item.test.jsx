"use strict";

//local imports

const MetaItem = require("../../../../../scripts/client/components/notifications/meta/meta-item");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//node modules

const React = require("react");

//utilities

const { testShallow } = testWrapper(MetaItem);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(MetaItem));

//meta item

describe("MetaItem", () => {

  const testItem = withDataList(testShallow, [null, {
    buttons: [{ icon: "icon" }],
    item: {
      id: "id-a",
      date: 0
    },
    notification: <div />
  }]);

  const testSnapshot = initTestSnapshot(testItem);

  const testClick = initTestEvent(testItem, "click");

  it("should match snapshot", () => testSnapshot());

  it("should call handleClick on click", () => {

    const handler = jest.fn();

    return testClick(".qa-click-item", [null, { buttons: [{ handler }] }], () => {
      testMock(handler, ["id-a"]);
    });

  });

});

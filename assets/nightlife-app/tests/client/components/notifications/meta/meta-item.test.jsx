"use strict";

//local imports

const MetaItem = require("../../../../../scripts/client/components/notifications/meta/meta-item");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//node modules

const React = require("react");

//utilities

const { testShallow } = testWrapper(MetaItem);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(MetaItem));

//meta item

describe("meta item", () => {

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

  it("should call handler and refresh on click", () => {

    const handler = jest.fn();
    const refresh = jest.fn();

    const args = [
      ".qa-action-item",
      [null, {
        buttons: [{ handler }],
        refresh
      }],
      () => {
        testMock(handler, ["id-a"]);
        testMock(refresh, []);
      }
    ];

    return testClick(...args);

  });

});

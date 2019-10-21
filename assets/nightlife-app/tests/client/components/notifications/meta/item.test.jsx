"use strict";

//local imports

const Item = require("../../../../../scripts/client/components/notifications/meta/item");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initDeepCopy } = require("all/utilities");
const { testMock } = require("redux/tests/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//node modules

const React = require("react");

//utilities

const { testMount, testShallow } = testWrapper(Item);

const deepCopy = initDeepCopy({ array: false });

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(Item));

//item

describe("item", () => {

  const dataList = [null, {
    buttons: [{ icon: "icon" }],
    item: {
      id: "id-a",
      date: 0
    },
    notification: <div />
  }];

  const testSnapshot = initTestSnapshot(testShallow);

  const testClick = initTestEvent(testMount, "click");

  it("should match snapshot", () => testSnapshot(...dataList));

  it("should call handler and refresh on click", () => {

    const handler = jest.fn();
    const refresh = jest.fn();

    const args = [
      ".qa-action-item",
      deepCopy(dataList, [null, {
        buttons: [{ handler }],
        refresh
      }]),
      () => {
        testMock(handler, ["id-a"]);
        testMock(refresh, []);
      }
    ];

    return testClick(...args);

  });

});

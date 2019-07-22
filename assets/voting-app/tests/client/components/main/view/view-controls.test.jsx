"use strict";

//local imports

const ViewControls = require("../../../../../scripts/client/components/main/view/view-controls");

const { newPoll } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas");
const { testMock } = require("test-helpers/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests, withDataList } = require("test-helpers/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(ViewControls);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ViewControls));

//view controls

describe("view controls", () => {

  const dataList = [null, { poll: newPoll() }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  const testClick = initTestEvent(withDataList(testMount, dataList), "click");

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

  it("should call writeText on click", () => {

    navigator.clipboard = { writeText: jest.fn() };

    return testClick(".qa-share-poll", [], () => {
      testMock(navigator.clipboard.writeText, [location.href]);
    });

  });

});
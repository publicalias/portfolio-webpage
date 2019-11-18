"use strict";

//local imports

const VenueSwipe = require("../../../../../../../scripts/client/components/main/venue/page/data/venue-swipe");

const { testWrapper } = require("../../../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueSwipe);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueSwipe));

//venue swipe

describe("VenueSwipe", () => {

  const testSwipe = withDataList(testShallow, [null, {
    handleClick: jest.fn(),
    type: "meta"
  }]);

  const testSnapshot = initTestSnapshot(testSwipe);

  const testClick = initTestEvent(testSwipe, "click", {});

  it("should match snapshot", () => testSnapshot());

  it("should call handleClick on click", () => {

    const handleClick = jest.fn();

    return testClick(".qa-click-swipe", [null, { handleClick }], () => {
      testMock(handleClick, [{}]);
    });

  });

});

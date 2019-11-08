"use strict";

//local imports

const VenueSwipe = require("../../../../../../../scripts/client/components/main/venue/page/photos/venue-swipe");

const { testWrapper } = require("../../../../../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueSwipe);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueSwipe));

//venue swipe

describe("venue swipe", () => {

  const testSwipe = withDataList(testShallow, [null, {
    handleClick: jest.fn(),
    type: "meta"
  }]);

  const testSnapshot = initTestSnapshot(testSwipe);

  const testClick = initTestEvent(testSwipe, "click", {});

  it("should match snapshot", () => testSnapshot());

  it("should call handleClick on click", () => {

    const handleClick = jest.fn();

    return testClick(".qa-carousel-swipe", [null, { handleClick }], () => {
      testMock(handleClick, [{}]);
    });

  });

});

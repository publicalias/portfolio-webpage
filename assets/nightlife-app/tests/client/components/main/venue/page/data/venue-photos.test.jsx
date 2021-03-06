"use strict";

//local imports

const VenuePhotos = require("../../../../../../../scripts/client/components/main/venue/page/data/venue-photos");

const { newVenue } = require("../../../../../../../schemas");
const { testWrapper } = require("../../../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, testMockHook, withDataList } = require("redux/tests/client-tests");
const { mockResults, testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(VenuePhotos);

const photo = "https://www.example.com/photo.jpg";

const dataList = [{ venues: { page: { body: { photo } } } }, { venue: newVenue() }];

const mockUseCarousel = () => ({
  lib: {
    useCarousel: jest.fn(() => ({
      events: {
        handleError: jest.fn(),
        handleLoad: jest.fn(),
        handleTouchEnd: jest.fn(),
        handleTouchStart: jest.fn()
      },
      utilities: {
        handlePause: jest.fn(() => jest.fn()),
        handleTurn: jest.fn(() => jest.fn())
      }
    }))
  }
});

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenuePhotos, mockUseCarousel()));

//venue photos

describe("VenuePhotos (general)", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  const testPhotos = withDataList(testMount, dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (turn)", () => testSnapshot(null, { venue: { photos: ["", ""] } }));

  it("should call useCarousel on update", () => {

    const { lib: { useCarousel } } = mockUseCarousel();

    testMockHook(VenuePhotos, testPhotos, "useCarousel", [], useCarousel);

  });

});

describe("VenuePhotos (events)", () => {

  const testEvent = (type, fn) => initTestEvent(withDataList(testShallow, dataList), type, {})(
    ".qa-ref-carousel",
    [],
    () => {

      const { lib: { useCarousel } } = VenuePhotos.injected;

      fn(useCarousel);

    }
  );

  const testMouse = (call) => (useCarousel) => {

    const handler = mockResults(mockResults(useCarousel)[0].utilities.handlePause)[call];

    testMock(handler, [{}]);

  };

  const testTouch = (type) => (useCarousel) => {

    const handler = mockResults(useCarousel)[0].events[type];

    testMock(handler, [{}]);

  };

  it("should call handlePause on mouseenter", () => testEvent("mouseenter", testMouse(0)));

  it("should call handlePause on mouseleave", () => testEvent("mouseleave", testMouse(1)));

  it("should call handleTouchEnd on touchend", () => testEvent("touchend", testTouch("handleTouchEnd")));

  it("should call handleTouchStart on touchstart", () => testEvent("touchstart", testTouch("handleTouchStart")));

});

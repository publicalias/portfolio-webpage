"use strict";

//local imports

const VenueImage = require("../../../../../../../scripts/client/components/main/venue/page/data/venue-image");

const { newVenue } = require("../../../../../../../schemas");
const { testWrapper } = require("../../../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueImage);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueImage));

//venue image

describe("VenueImage", () => {

  const testImage = withDataList(testShallow, [null, {
    handleError: jest.fn(),
    handleLoad: jest.fn(),
    src: "https://www.example.com/photo.jpg",
    venue: newVenue()
  }]);

  const testSnapshot = initTestSnapshot(testImage);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (url)", () => testSnapshot(null, { venue: { url: "https://www.example.com/" } }));

  it("should call handleError on error", () => {

    const handleError = jest.fn();

    const event = { target: { src: "" } };
    const placeholder = "https://via.placeholder.com/800x450?text=undefined";

    const testError = initTestEvent(testImage, "error", event);

    return testError(".qa-ref-image", [null, { handleError }], () => {

      testMock(handleError, []);

      expect(event.target.src).toEqual(placeholder);

    });

  });

  it("should call handleLoad on load", () => {

    const handleLoad = jest.fn();

    const testLoad = initTestEvent(testImage, "load", {});

    return testLoad(".qa-ref-image", [null, { handleLoad }], () => {
      testMock(handleLoad, [{}]);
    });

  });

});

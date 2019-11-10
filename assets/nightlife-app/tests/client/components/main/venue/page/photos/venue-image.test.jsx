"use strict";

//local imports

const VenueImage = require("../../../../../../../scripts/client/components/main/venue/page/photos/venue-image");

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

  const src = "https://www.example.com/photo.jpg";

  const testImage = withDataList(testShallow, [null, {
    handleError: jest.fn(),
    handleLoad: jest.fn(),
    src: "",
    venue: newVenue({ url: "https://www.example.com/" })
  }]);

  const testSnapshot = initTestSnapshot(testImage);

  const testEvent = (type, prop) => initTestEvent(testImage, type, {})(
    ".qa-carousel-image",
    [null, {
      handleError: jest.fn(),
      handleLoad: jest.fn(),
      src
    }],
    (props) => {

      const handler = props.local[prop];

      testMock(handler, [{}]);

    }
  );

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (src)", () => testSnapshot(null, { src }));

  it("should call handleError on error", () => testEvent("error", "handleError"));

  it("should call handleLoad on load", () => testEvent("load", "handleLoad"));

});

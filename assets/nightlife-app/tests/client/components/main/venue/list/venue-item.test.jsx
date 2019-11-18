"use strict";

//local imports

const VenueItem = require("../../../../../../scripts/client/components/main/venue/list/venue-item");

const { newVenue } = require("../../../../../../schemas");
const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueItem);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueItem));

//venue item

describe("VenueItem", () => {

  const testItem = withDataList(testShallow, [null, {
    venue: newVenue({
      id: "id-a",
      image_url: "https://www.example.com/thumbnail.jpg",
      name: "Venue A"
    })
  }]);

  const testSnapshot = initTestSnapshot(testItem);

  it("should match snapshot", () => testSnapshot());

  it("should call handleError on error", () => {

    const event = { target: { src: "" } };
    const placeholder = "https://via.placeholder.com/100x100?text=undefined";

    const testError = initTestEvent(testItem, "error", event);

    return testError(".qa-error-image", [], () => {
      expect(event.target.src).toEqual(placeholder);
    });

  });

});

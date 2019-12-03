"use strict";

//local imports

const VenueData = require("../../../../../../../scripts/client/components/main/venue/page/data/venue-data");

const { newVenue } = require("../../../../../../../schemas");
const { testWrapper } = require("../../../../../test-helpers");

//global imports

const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueData);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueData, {
  lib: {
    delimit: jest.fn((x) => x),
    getHours: jest.fn(() => "Closed - Opens at 12:00 AM")
  }
}));

//venue data

describe("VenueData", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, { venue: newVenue() }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { venue: { name: "Venue A" } }));

  it("should match snapshot (address)", () => testSnapshot(null, {
    venue: {
      location: {
        display_address: [
          "Address Line 1",
          "Address Line 2"
        ]
      }
    }
  }));

  it("should match snapshot (phone)", () => testSnapshot(null, { venue: { display_phone: "(000) 000-0000" } }));

});

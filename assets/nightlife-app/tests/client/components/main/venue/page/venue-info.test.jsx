"use strict";

//local imports

const VenueInfo = require("../../../../../../scripts/client/components/main/venue/page/venue-info");

const { newVenue } = require("../../../../../../schemas");
const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueInfo);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueInfo, { lib: { getHours: jest.fn(() => "Closed - Opens at 12:00 AM") } }));

//venue info

describe("venue info", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, { venue: newVenue() }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (url)", () => testSnapshot(null, { venue: { url: "https://www.example.com/" } }));

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

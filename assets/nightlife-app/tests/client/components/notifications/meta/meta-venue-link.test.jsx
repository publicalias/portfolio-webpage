"use strict";

//local imports

const MetaVenueLink = require("../../../../../scripts/client/components/notifications/meta/meta-venue-link");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(MetaVenueLink);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(MetaVenueLink));

//meta venue link

describe("MetaVenueLink", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, { venue: { id: "id-a" } }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { venue: { name: "Venue A" } }));

});

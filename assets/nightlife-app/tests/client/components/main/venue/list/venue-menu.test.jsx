"use strict";

//local imports

const VenueMenu = require("../../../../../../scripts/client/components/main/venue/list/venue-menu");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueMenu);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueMenu));

//venue menu

describe("VenueMenu", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (search)", () => testSnapshot({ venues: { list: { menu: { search: "Coffee" } } } }));

});

"use strict";

//local imports

const VenueBody = require("../../../../../../scripts/client/components/main/venue/list/venue-body");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueBody);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueBody));

//venue body

describe("VenueBody", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, { handleScroll: jest.fn() }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (list)", () => testSnapshot({ venues: { data: [{}] } }));

});

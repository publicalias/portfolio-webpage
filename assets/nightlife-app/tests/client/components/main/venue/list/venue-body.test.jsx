"use strict";

//local imports

const VenueBody = require("../../../../../../scripts/client/components/main/venue/list/venue-body");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueBody);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueBody));

//venue body

describe("venue body", () => {

  const dataList = [null, { handleScroll: jest.fn() }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (list)", () => testSnapshot({ venues: { data: [{}] } }));

});

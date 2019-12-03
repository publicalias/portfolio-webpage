"use strict";

//local imports

const RSVPList = require("../../../../../scripts/client/components/notifications/rsvp/rsvp-list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, testMockHook } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(RSVPList);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(RSVPList));

//rsvp list

describe("RSVPList", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (bool)", () => testSnapshot({ venues: { data: [{}] } }));

  it("should match snapshot (list)", () => testSnapshot({ notifications: { rsvps: [{}] } }));

  it("should call useRefresh on update", () => testMockHook(RSVPList, testMount, "useRefresh"));

});

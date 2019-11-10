"use strict";

//local imports

const RSVPList = require("../../../../../scripts/client/components/notifications/rsvp/rsvp-list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(RSVPList);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(RSVPList));

//rsvp list

describe("rsvp list", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (bool)", () => testSnapshot({ venues: { data: [{}] } }));

  it("should match snapshot (list)", () => testSnapshot({ notifications: { rsvps: [{}] } }));

});

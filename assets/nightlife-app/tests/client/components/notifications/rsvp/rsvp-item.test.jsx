"use strict";

//local imports

const RSVPItem = require("../../../../../scripts/client/components/notifications/rsvp/rsvp-item");

const { newRSVP, newUserWithData } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(RSVPItem);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(RSVPItem));

//rsvp item

describe("RSVPItem", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  const getRSVP = () => newRSVP({
    user: { id: "id-a" },
    venue: { id: "id-b" },
    time: "9:00 PM"
  });

  const testSelf = withDataList(testSnapshot, [{ user: newUserWithData({ id: "id-a" }) }, { rsvp: getRSVP() }]);
  const testUser = withDataList(testSnapshot, [null, { rsvp: getRSVP() }]);

  it("should match snapshot (self, default)", () => testSelf());

  it("should match snapshot (self, message)", () => testSelf(null, { rsvp: { message: "Message" } }));

  it("should match snapshot (user, default)", () => testUser());

  it("should match snapshot (user, message)", () => testUser(null, { rsvp: { message: "Message" } }));

});

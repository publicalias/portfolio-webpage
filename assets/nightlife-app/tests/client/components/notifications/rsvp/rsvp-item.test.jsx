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

const getRSVP = () => newRSVP({
  user: { id: "id-a" },
  venue: {
    name: "Venue B",
    id: "id-b"
  },
  time: "9:00 PM"
});

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(RSVPItem));

//rsvp item

describe("rsvp item (self)", () => {

  const dataList = [{ user: newUserWithData({ id: "id-a" }) }, { rsvp: getRSVP() }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (message)", () => testSnapshot(null, { rsvp: { message: "Message" } }));

});

describe("rsvp item (user)", () => {

  const dataList = [null, { rsvp: getRSVP() }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { rsvp: { user: { name: "User A" } } }));

  it("should match snapshot (message)", () => testSnapshot(null, { rsvp: { message: "Message" } }));

});

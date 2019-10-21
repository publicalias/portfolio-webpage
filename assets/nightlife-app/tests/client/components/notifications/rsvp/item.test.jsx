"use strict";

//local imports

const Item = require("../../../../../scripts/client/components/notifications/rsvp/item");

const { newRSVP, newUserWithData } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(Item);

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
beforeEach(reactTests.inject(Item));

//item

describe("item (self)", () => {

  const dataList = [{ user: newUserWithData({ id: "id-a" }) }, { rsvp: getRSVP() }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (message)", () => testSnapshot(null, { rsvp: { message: "Message" } }));

});

describe("item (user)", () => {

  const dataList = [null, { rsvp: getRSVP() }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { rsvp: { user: { name: "User A" } } }));

  it("should match snapshot (message)", () => testSnapshot(null, { rsvp: { message: "Message" } }));

});

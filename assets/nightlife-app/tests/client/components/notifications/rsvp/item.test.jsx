"use strict";

//local imports

const Item = require("../../../../../scripts/client/components/notifications/rsvp/item");

const { newRSVP, newUserWithData } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(Item);

const rsvp = newRSVP({
  id: "id-a",
  user: { id: "id-b" },
  venue: {
    name: "Venue C",
    id: "id-c"
  },
  time: "9:00 PM"
});

const testClick = (dataList, type) => {

  const testClick = initTestEvent(testMount, "click");

  return testClick(".qa-dismiss-rsvp", dataList, [type, ["id-a"]]);

};

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(Item));

//item

describe("item (self)", () => {

  const dataList = [{ user: newUserWithData({ id: "id-b" }) }, { rsvp }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (message)", () => testSnapshot(null, { rsvp: { message: "Message" } }));

  it("should call rsvpRemove on click", () => testClick(dataList, "rsvpRemove"));

});

describe("item (user)", () => {

  const dataList = [null, { rsvp }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { rsvp: { user: { name: "User B" } } }));

  it("should match snapshot (message)", () => testSnapshot(null, { rsvp: { message: "Message" } }));

  it("should call rsvpDismiss on click", () => testClick(dataList, "rsvpDismiss"));

});

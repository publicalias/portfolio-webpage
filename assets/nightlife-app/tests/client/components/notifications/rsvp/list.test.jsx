"use strict";

//local imports

const List = require("../../../../../scripts/client/components/notifications/rsvp/list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(List);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(List));

//list

describe("list", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (list)", () => testSnapshot({ notifications: { rsvps: [{}] } }));

});

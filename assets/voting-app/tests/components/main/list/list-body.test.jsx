"use strict";

//local imports

const ListBody = require("../../../../scripts/components/main/list/list-body");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//list body

describe("list body", () => {

  const { testShallow } = testWrapper(ListBody);

  const testSnapshot = initTestSnapshot(testShallow);

  const local = { handleScroll() {} };

  it("should match snapshot (default)", () => testSnapshot({}, local));

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }, local));

  it("should match snapshot (polls)", () => testSnapshot({ polls: [newPoll()] }, local));

});

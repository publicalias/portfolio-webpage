"use strict";

//local imports

const ListBody = require("../../../../scripts/components/main/list/list-body");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const { testShallow } = testWrapper(ListBody);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ListBody));

//list body

describe("list body", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  const testProps = (data) => testSnapshot(data, { handleScroll: jest.fn() });

  it("should match snapshot (default)", () => testProps());

  it("should match snapshot (authenticated)", () => testProps({ user: newUser() }));

  it("should match snapshot (polls)", () => testProps({ polls: [newPoll()] }));

});

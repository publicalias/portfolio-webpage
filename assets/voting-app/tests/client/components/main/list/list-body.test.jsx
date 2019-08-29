"use strict";

//local imports

const ListBody = require("../../../../../scripts/client/components/main/list/list-body");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(ListBody);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ListBody));

//list body

describe("list body", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, { handleScroll: jest.fn() }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

  it("should match snapshot (polls)", () => testSnapshot({ polls: [{}] }));

});

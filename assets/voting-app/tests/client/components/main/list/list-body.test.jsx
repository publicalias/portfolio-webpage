"use strict";

//local imports

const ListBody = require("../../../../../scripts/client/components/main/list/list-body");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(ListBody);

const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, { handleScroll: jest.fn() }]);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ListBody));

//list body

describe("list body", () => {

  const testScroll = initTestEvent(testShallow, "scroll", {});

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

  it("should match snapshot (list)", () => testSnapshot({ polls: [{}] }));

  it("should call handleScroll on scroll", () => {

    const handleScroll = jest.fn();

    return testScroll(".qa-infinite-scroll", [null, { handleScroll }], () => {
      testMock(handleScroll, [{}]);
    });

  });

});

describe("list body (header)", () => {

  const getArgs = (filter) => [null, null, { location: { search: `?filter=${filter}` } }];

  it("should match snapshot (all)", () => testSnapshot(...getArgs("all")));

  it("should match snapshot (created)", () => testSnapshot(...getArgs("created")));

  it("should match snapshot (voted)", () => testSnapshot(...getArgs("voted")));

  it("should match snapshot (hidden)", () => testSnapshot(...getArgs("hidden")));

});

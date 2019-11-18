"use strict";

//local imports

const ListBody = require("../../../../../scripts/client/components/main/list/list-body");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(ListBody);

const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, { handleScroll: jest.fn() }]);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ListBody));

//list body

describe("ListBody (general)", () => {

  const testScroll = initTestEvent(testShallow, "scroll", {});

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

  it("should match snapshot (list)", () => testSnapshot({ polls: [{}] }));

  it("should call handleScroll on scroll", () => {

    const handleScroll = jest.fn();

    return testScroll(".qa-ref-scroll", [null, { handleScroll }], () => {
      testMock(handleScroll, [{}]);
    });

  });

});

describe("ListBody (header)", () => {

  const testBody = (filter) => testSnapshot(null, null, { location: { search: `?filter=${filter}` } });

  it("should match snapshot (all)", () => testBody("all"));

  it("should match snapshot (created)", () => testBody("created"));

  it("should match snapshot (voted)", () => testBody("voted"));

  it("should match snapshot (hidden)", () => testBody("hidden"));

});

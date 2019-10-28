"use strict";

//local imports

const ListBody = require("../../../../../scripts/client/components/main/list/list-body");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(ListBody);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ListBody));

//list body

describe("list body", () => {

  const dataList = [null, { handleScroll: jest.fn() }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  const testScroll = initTestEvent(testMount, "scroll");

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

  it("should match snapshot (list)", () => testSnapshot({ polls: [{}] }));

  it("should call handleScroll on scroll", () => testScroll(".qa-infinite-scroll", dataList, (props) => {

    const { local: { handleScroll } } = props;

    testMock(handleScroll, []);

  }));

});

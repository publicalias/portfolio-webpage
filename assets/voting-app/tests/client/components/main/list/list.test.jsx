"use strict";

//local imports

const List = require("../../../../../scripts/client/components/main/list/list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, mockInfiniteScroll, testMockHook } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(List);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(List, { lib: mockInfiniteScroll().lib }));

//list

describe("List", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot", () => testSnapshot());

  it("should call handleReload conditionally on update", () => {

    const { handleReload, lib: { useInfiniteScroll } } = mockInfiniteScroll();

    List.injected.lib.useInfiniteScroll = useInfiniteScroll;

    const { setProps, wrapper } = testMount();

    wrapper.mount();

    setProps(null, null, { location: { search: "?filter=created" } });

    testMock(handleReload, [], []);

    wrapper.unmount();

  });

  it("should call useInfiniteScroll on update", () => {

    const { lib: { useInfiniteScroll } } = mockInfiniteScroll();

    testMockHook(List, testMount, "useInfiniteScroll", [], useInfiniteScroll);

  });

});

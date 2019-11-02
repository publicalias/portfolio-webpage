"use strict";

//local imports

const List = require("../../../../../scripts/client/components/main/list/list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { mockInfiniteScroll } = require("redux/tests/client-tests");
const { initTestSnapshot, reactTests, setProps } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(List);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(List, { lib: mockInfiniteScroll().lib }));

//list

describe("list", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot", () => testSnapshot());

  it("should call handleReload conditionally on update", () => {

    const { handleReload, lib } = mockInfiniteScroll();

    Object.assign(List.injected.lib, lib);

    const { wrapper } = testMount();

    wrapper.mount();

    setProps(wrapper, null, null, { location: { search: "?filter=created" } });

    testMock(handleReload, [], []);

    wrapper.unmount();

  });

});

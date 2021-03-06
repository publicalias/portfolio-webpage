"use strict";

//local imports

const UserList = require("../../../../../../scripts/client/components/main/user/list/user-list");

const { getGeoPoint, testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, mockInfiniteScroll, testMockHook } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(UserList);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserList, { lib: mockInfiniteScroll().lib }));

//user list

describe("UserList", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot", () => testSnapshot());

  it("should call handleReload conditionally on update", () => {

    const { handleReload, lib: { useInfiniteScroll } } = mockInfiniteScroll();

    UserList.injected.lib.useInfiniteScroll = useInfiniteScroll;

    const list = [
      [{ user: { data: { location: null } } }],
      [{ ready: true }],
      [null, null, { location: { search: "" } }],
      [{ user: { data: { location: getGeoPoint(0) } } }]
    ];

    const { setProps, wrapper } = testMount();

    wrapper.mount();

    for (const e of list) {
      setProps(...e);
    }

    testMock(handleReload, [], [], []);

    wrapper.unmount();

  });

  it("should call useInfiniteScroll on update", () => {

    const { lib: { useInfiniteScroll } } = mockInfiniteScroll();

    testMockHook(UserList, testMount, "useInfiniteScroll", [], useInfiniteScroll);

  });

});

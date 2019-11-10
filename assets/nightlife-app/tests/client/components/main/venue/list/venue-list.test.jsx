"use strict";

//local imports

const VenueList = require("../../../../../../scripts/client/components/main/venue/list/venue-list");

const { getGeoPoint, testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, mockInfiniteScroll } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(VenueList);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueList, { lib: mockInfiniteScroll().lib }));

//venue list

describe("venue list", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot", () => testSnapshot());

  it("should call handleReload conditionally on update", () => {

    const { handleReload, lib } = mockInfiniteScroll();

    Object.assign(VenueList.injected.lib, lib);

    const list = [
      [{ user: { data: { location: null } } }],
      [{ account: { loaded: true } }],
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

});

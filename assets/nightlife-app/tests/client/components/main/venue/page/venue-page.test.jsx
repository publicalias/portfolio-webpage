"use strict";

//local imports

const VenuePage = require("../../../../../../scripts/client/components/main/venue/page/venue-page");

const { newUserWithData } = require("../../../../../../schemas");
const { getGeoPoint, testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(VenuePage);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenuePage, { lib: { getLocation: jest.fn((user) => user.data.location) } }));

//venue page

describe("VenuePage (general)", () => {

  const dataList = [null, { id: "id-a" }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  const testPage = withDataList(testMount, dataList);

  const testLoadA = (fn) => {

    const { props, setProps, wrapper } = testPage();

    wrapper.mount();

    setProps(null, { id: "id-b" });

    fn(props);

    wrapper.unmount();

  };

  const testLoadB = async (fn) => {

    const userA = { user: { data: { location: null } } };
    const userB = { user: { data: { location: getGeoPoint(0) } } };

    const list = [
      [userA],
      [{ ready: true }],
      [{ notifications: { friends: [{}] } }],
      [{ notifications: { rsvps: [{}] } }],
      [userB]
    ];

    const { props, setProps, wrapper } = testPage();

    wrapper.mount();

    for (const e of list) {
      setProps(...e);
    }

    await Promise.resolve();

    fn(props, userA.user, userB.user);

    wrapper.unmount();

  };

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUserWithData() }));

  it("should match snapshot (match)", () => testSnapshot({ venues: { data: [{ id: "id-a" }] } }));

  it("should call venueClearState conditionally on update", () => testLoadA((props) => {

    const { actions: { venueClearState } } = props;

    testMock(venueClearState, [], []);

  }));

  it("should call initVenueData conditionally on update", () => testLoadB((props, userA, userB) => {

    const { actions: { venueGetItem } } = props;

    const { lib: { getLocation } } = VenuePage.injected;

    testMock(getLocation, [userA], [userA], [userA], [userB]);
    testMock(venueGetItem, ["id-a", null], ["id-a", null], ["id-a", null], ["id-a", getGeoPoint(0)]);

  }));

});

describe("VenuePage (list)", () => {

  const dataList = [{ venues: { data: [{ id: "id-a" }] } }, { id: "id-a" }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  const testPage = (data) => testSnapshot({ venues: { data: [data] } });

  it("should match snapshot (favorites)", () => testPage({ favorites: [{ user: { id: "id-b" } }] }));

  it("should match snapshot (favorites, name)", () => testPage({
    favorites: [{
      user: {
        name: "User B",
        id: "id-b"
      }
    }]
  }));

  it("should match snapshot (rsvps)", () => testPage({ rsvps: [{ user: { id: "id-b" } }] }));

  it("should match snapshot (rsvps, name)", () => testPage({
    rsvps: [{
      user: {
        name: "User B",
        id: "id-b"
      }
    }]
  }));

});

"use strict";

//local imports

const UI = require("../../../scripts/client/components/ui");

const { newUserWithData } = require("../../../schemas");
const { getGeoPoint, testWrapper } = require("../test-helpers");

//global imports

const { initTestSnapshot, testMockHook } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(UI);

const userData = { location: getGeoPoint(0) };

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UI, { lib: { getLocation: jest.fn(() => userData.location) } }));

//ui

describe("UI (snapshots)", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUserWithData() }));

});

describe("UI (lifecycle)", () => {

  const { location } = userData;

  const initDataList = (user = {}) => [null, null, { actions: { metaGetUser: jest.fn(() => ({ user })) } }];

  const testLoadDefault = (props) => {

    const { actions: { metaGetUser, metaSaveAddress, metaSetReady } } = props;

    const { lib: { getLocation } } = UI.injected;

    testMock(metaGetUser, []);
    testMock(getLocation);
    testMock(metaSaveAddress);
    testMock(metaSetReady, [true]);

  };

  const testLoad = async (user, fn = testLoadDefault) => {

    const { props, wrapper } = testMount(...initDataList(user));

    wrapper.mount();

    await Promise.resolve();
    await Promise.resolve();

    fn(props);

    wrapper.unmount();

  };

  it("should call initUser on load (default)", () => testLoad());

  it("should call initUser on load (authenticated, location)", () => {

    const user = newUserWithData({ data: { location } });

    return testLoad(user);

  });

  it("should call initUser on load (authenticated, no location)", () => {

    const user = newUserWithData();

    return testLoad(user, (props) => {

      const { actions: { metaGetUser, metaSaveAddress, metaSetReady } } = props;

      const { lib: { getLocation } } = UI.injected;

      testMock(metaGetUser, []);
      testMock(getLocation, [user]);
      testMock(metaSaveAddress, ["", location]);
      testMock(metaSetReady, [true]);

    });

  });

  it("should call useRefresh on update", () => testMockHook(
    UI,
    testMount,
    "useRefresh",
    initDataList()
  ));

});

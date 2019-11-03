"use strict";

//local imports

const UI = require("../../../scripts/client/components/ui");

const { newUserWithData } = require("../../../schemas");
const { getGeoPoint, testWrapper } = require("../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(UI);

const userData = { location: getGeoPoint(0) };

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UI, { lib: { getLocation: jest.fn(() => userData.location) } }));

//ui

describe("ui", () => {

  const { location } = userData;

  const testSnapshot = initTestSnapshot(testShallow);

  const testLoadDefault = (props) => {

    const { actions: { metaGetUser, metaSaveAddress, metaToggleLoaded } } = props;

    const { lib: { getLocation } } = UI.injected;

    testMock(metaGetUser, []);
    testMock(getLocation);
    testMock(metaSaveAddress);
    testMock(metaToggleLoaded, []);

  };

  const testLoad = async (user = {}, fn = testLoadDefault) => {

    const dataList = [null, null, { actions: { metaGetUser: jest.fn(() => ({ user })) } }];

    const { props, wrapper } = testMount(...dataList);

    wrapper.mount();

    await Promise.resolve();
    await Promise.resolve();

    fn(props);

    wrapper.unmount();

  };

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUserWithData() }));

  it("should call initUser on load (default)", () => testLoad());

  it("should call initUser on load (authenticated, location)", () => {

    const user = newUserWithData({ data: { location } });

    return testLoad(user);

  });

  it("should call initUser on load (authenticated, no location)", () => {

    const user = newUserWithData();

    return testLoad(user, (props) => {

      const { actions: { metaGetUser, metaSaveAddress, metaToggleLoaded } } = props;

      const { lib: { getLocation } } = UI.injected;

      testMock(metaGetUser, [], []);
      testMock(getLocation, [user]);
      testMock(metaSaveAddress, ["", location]);
      testMock(metaToggleLoaded, []);

    });

  });

});

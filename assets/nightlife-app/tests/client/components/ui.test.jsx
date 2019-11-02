"use strict";

//local imports

const UI = require("../../../scripts/client/components/ui");

const { newUserWithData } = require("../../../schemas");
const { getGeoPoint, testWrapper } = require("../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//node modules

const { MemoryRouter } = require("react-router-dom");

//utilities

const { testMount, testShallow } = testWrapper(UI, MemoryRouter);

const userData = { location: getGeoPoint(0) };

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UI, { lib: { getLocation: jest.fn(() => userData.location) } }));

//ui

describe("ui", () => {

  const { location } = userData;

  const testSnapshot = initTestSnapshot(testShallow);

  const testLoad = async (user, fn) => {

    const dataList = [null, null, { actions: { metaGetUser: jest.fn(() => ({ user })) } }];

    const { props, wrapper } = testMount(...dataList);

    wrapper.mount();

    await Promise.resolve();
    await Promise.resolve();

    fn(props);

    wrapper.unmount();

  };

  const testDefault = (props) => {

    const { actions: { metaGetUser, metaSaveAddress, metaToggleLoaded } } = props;

    const { lib: { getLocation } } = UI.injected;

    testMock(metaGetUser, []);
    testMock(getLocation);
    testMock(metaSaveAddress);
    testMock(metaToggleLoaded, []);

  };

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUserWithData() }));

  it("should call initUser on load (default)", () => testLoad({}, testDefault));

  it("should call initUser on load (authenticated, location)", () => {

    const user = newUserWithData({ data: { location } });

    return testLoad(user, testDefault);

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

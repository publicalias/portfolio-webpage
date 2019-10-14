"use strict";

//local imports

const UI = require("../../../scripts/client/components/ui");

const { newGeoPoint, newUserWithData } = require("../../../schemas");
const { testWrapper } = require("../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//node modules

const { MemoryRouter } = require("react-router-dom");

//utilities

const { testMount, testShallow } = testWrapper(UI, MemoryRouter);

const location = newGeoPoint({ coordinates: [0, 0] });

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UI, { lib: { getLocation: jest.fn(() => location) } }));

//ui

describe("ui", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  const testLoad = async (user, fn) => {

    const dataList = [null, null, { actions: { metaGetUser: jest.fn(() => ({ user })) } }];

    const { props, wrapper } = testMount(...dataList);

    const { actions: { metaGetUser, metaSaveAddress } } = props;

    const { lib: { getLocation } } = UI.injected;

    wrapper.mount();

    await Promise.resolve();

    fn(metaGetUser, getLocation, metaSaveAddress);

    wrapper.unmount();

  };

  it("should match snapshot", () => testSnapshot());

  it("should call initUser on load (default)", () => testLoad({}, (metaGetUser, getLocation, metaSaveAddress) => {
    testMock(metaGetUser, []);
    testMock(getLocation);
    testMock(metaSaveAddress);
  }));

  it("should call initUser on load (authenticated)", () => {

    const user = newUserWithData();

    return testLoad(user, (metaGetUser, getLocation, metaSaveAddress) => {
      testMock(metaGetUser, [], []);
      testMock(getLocation, [user]);
      testMock(metaSaveAddress, [null, location]);
    });

  });

});

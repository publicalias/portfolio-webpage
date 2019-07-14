"use strict";

//local imports

const UI = require("../../scripts/components/ui");

const { testWrapper } = require("../test-helpers");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//node modules

const { MemoryRouter } = require("react-router-dom");

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UI));

//ui

describe("ui", () => {

  const { testMount, testShallow } = testWrapper(UI, MemoryRouter);

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot", () => testSnapshot());

  it("should call metaGetUser on load", () => {

    const { props, wrapper } = testMount();

    const { actions: { metaGetUser } } = props;

    wrapper.mount();

    testMock(metaGetUser, []);

    wrapper.unmount();

  });

});

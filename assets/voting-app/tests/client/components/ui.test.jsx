"use strict";

//local imports

const UI = require("../../../scripts/client/components/ui");

const { testWrapper } = require("../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(UI);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UI));

//ui

describe("UI", () => {

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

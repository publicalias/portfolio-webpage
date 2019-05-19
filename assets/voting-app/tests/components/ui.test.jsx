"use strict";

//local imports

const UI = require("../../scripts/components/ui");

const { testWrapper } = require("../test-helpers");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { reactTests } = require("test-helpers/react-tests");

//node modules

const { MemoryRouter } = require("react-router-dom");

//setup

beforeAll(reactTests.setup);

//ui

describe("ui", () => {

  const { testMount, testShallow } = testWrapper(UI, MemoryRouter);

  it("should match snapshot", () => {

    const { wrapper } = testShallow();

    expect(wrapper).toMatchSnapshot();

  });

  it("should call metaGetUser on mount", () => {

    const { props, wrapper } = testMount();

    const { actions: { metaGetUser } } = props;

    wrapper.mount();

    testMock(metaGetUser, []);

    wrapper.unmount();

  });

});

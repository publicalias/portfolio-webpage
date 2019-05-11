"use strict";

//local imports

const UI = require("../../scripts/components/ui");

const { testWrapper } = require("../test-helpers");

//global imports

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

  it("should call metaGetPolls and metaGetUser on mount", () => {

    const { props, wrapper } = testMount();

    const { actions: { metaGetPolls, metaGetUser } } = props;

    wrapper.mount();

    expect(metaGetPolls.mock.calls.length).toEqual(1);
    expect(metaGetUser.mock.calls.length).toEqual(1);

    wrapper.unmount();

  });

});

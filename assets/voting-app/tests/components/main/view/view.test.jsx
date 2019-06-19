"use strict";

//local imports

const View = require("../../../../scripts/components/main/view/view");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newPoll } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//view

describe("view", () => {

  const { testMount, testShallow } = testWrapper(View);

  it("should match snapshot (default)", () => {

    const { wrapper } = testShallow();

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (id)", () => {

    const { wrapper } = testShallow({ polls: [newPoll({ id: "id-a" })] }, {}, { location: { search: "?id=id-a" } });

    expect(wrapper).toMatchSnapshot();

  });

  it("should call viewClearState on load (default)", () => {

    const { props, wrapper } = testMount();

    const { actions: { viewClearState } } = props;

    wrapper.mount();

    testMock(viewClearState, []);

    wrapper.unmount();

  });

  it("should call viewClearState and metaGetPolls on load (id)", () => {

    const { props, wrapper } = testMount({}, {}, { location: { search: "?id=id-a" } });

    const { actions: { metaGetPolls, viewClearState } } = props;

    wrapper.mount();

    testMock(viewClearState, []);
    testMock(metaGetPolls, [null, "id-a"]);

    wrapper.unmount();

  });

});

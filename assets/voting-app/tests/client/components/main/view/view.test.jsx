"use strict";

//local imports

const View = require("../../../../../scripts/client/components/main/view/view");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(View);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(View));

//view

describe("view", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (id)", () => {

    const dataList = [{ polls: [{ id: "id-a" }] }, null, { location: { search: "?id=id-a" } }];

    testSnapshot(...dataList);

  });

  it("should call viewClearState on load (default)", () => {

    const { props, wrapper } = testMount();

    const { actions: { viewClearState } } = props;

    wrapper.mount();

    testMock(viewClearState, []);

    wrapper.unmount();

  });

  it("should call viewClearState and metaGetPolls on load (id)", () => {

    const { props, wrapper } = testMount(null, null, { location: { search: "?id=id-a" } });

    const { actions: { metaGetPolls, viewClearState } } = props;

    wrapper.mount();

    testMock(viewClearState, []);
    testMock(metaGetPolls, [null, "id-a"]);

    wrapper.unmount();

  });

});

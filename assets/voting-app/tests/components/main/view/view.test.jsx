"use strict";

//local imports

const View = require("../../../../scripts/components/main/view/view");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newPoll } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(View));

//view

describe("view", () => {

  const { testMount, testShallow } = testWrapper(View);

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (id)", () => testSnapshot({ polls: [newPoll({ id: "id-a" })] }, null, { location: { search: "?id=id-a" } }));

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

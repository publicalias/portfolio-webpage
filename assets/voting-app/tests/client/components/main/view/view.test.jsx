"use strict";

//local imports

const View = require("../../../../../scripts/client/components/main/view/view");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(View);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(View));

//view

describe("view", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot(null, { id: "id-a" }));

  it("should match snapshot (id)", () => {

    const dataList = [{ polls: [{ id: "id-a" }] }, { id: "id-a" }];

    testSnapshot(...dataList);

  });

  it("should call viewClearState and metaGetPolls on load", () => {

    const { props, wrapper } = testMount(null, { id: "id-a" });

    const { actions: { metaGetPolls, viewClearState } } = props;

    wrapper.mount();

    testMock(viewClearState, []);
    testMock(metaGetPolls, [null, "id-a"]);

    wrapper.unmount();

  });

});

"use strict";

//local imports

const View = require("../../../../../scripts/client/components/main/view/view");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

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

  it("should call viewClearState and metaGetPollItem on load", () => {

    const { props, wrapper } = testMount(null, { id: "id-a" });

    const { actions: { metaGetPollItem, viewClearState } } = props;

    wrapper.mount();

    testMock(viewClearState, []);
    testMock(metaGetPollItem, ["id-a"]);

    wrapper.unmount();

  });

});

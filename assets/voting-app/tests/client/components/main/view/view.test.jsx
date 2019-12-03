"use strict";

//local imports

const View = require("../../../../../scripts/client/components/main/view/view");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, testMockHook, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(View);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(View));

//view

describe("View", () => {

  const dataList = [null, { id: "id-a" }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  const testView = withDataList(testMount, dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (id)", () => testSnapshot({ polls: [{ id: "id-a" }] }));

  it("should call viewClearState and metaGetPollItem on load", () => {

    const { props, wrapper } = testView(null, { id: "id-a" });

    const { actions: { metaGetPollItem, viewClearState } } = props;

    wrapper.mount();

    testMock(viewClearState, []);
    testMock(metaGetPollItem, ["id-a"]);

    wrapper.unmount();

  });

  it("should call useRefresh on update", () => testMockHook(
    View,
    testView,
    "useRefresh"
  ));

});

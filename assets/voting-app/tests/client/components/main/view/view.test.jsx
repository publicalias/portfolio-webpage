"use strict";

//local imports

const View = require("../../../../../scripts/client/components/main/view/view");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
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

  it("should match snapshot (id)", () => testSnapshot({ view: { data: [{ id: "id-a" }] } }));

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

  it("should match snapshot (authenticated, id)", () => testSnapshot({
    user: newUser(),
    view: { data: [{ id: "id-a" }] }
  }));

  it("should match snapshot (options)", () => testSnapshot({
    view: {
      data: [{
        id: "id-a",
        options: [{}]
      }]
    }
  }));

  it("should call viewClearState and metaGetPollItem on load", () => {

    const { props, wrapper } = testView();

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

"use strict";

//local imports

const VenuePage = require("../../../../../../scripts/client/components/main/venue/page/venue-page");

const { newUserWithData } = require("../../../../../../schemas");
const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, testMockHook, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(VenuePage);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenuePage, { lib: { getLocation: jest.fn(() => null) } }));

//venue page

describe("VenuePage (general)", () => {

  const dataList = [null, { id: "id-a" }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  const testPage = withDataList(testMount, dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUserWithData() }));

  it("should match snapshot (match)", () => testSnapshot({ venues: { data: [{ id: "id-a" }] } }));

  it("should call venueClearState conditionally on update", () => {

    const { props, setProps, wrapper } = testPage();

    const { actions: { venueClearState } } = props;

    wrapper.mount();

    setProps(null, { id: "id-b" });

    testMock(venueClearState, [], []);

    wrapper.unmount();

  });

  it("should call refresh conditionally on update", async () => {

    const { props, setProps, wrapper } = testPage();

    const { actions: { venueGetItem } } = props;

    const { lib: { getLocation } } = VenuePage.injected;

    wrapper.mount();

    setProps({ ready: true });
    setProps(null, { id: "id-b" });

    await Promise.resolve();

    wrapper.unmount();

    testMock(getLocation, [{}], [{}]);
    testMock(venueGetItem, ["id-a", null], ["id-b", null]);

  });

  it("should call useRefresh on update", () => testMockHook(VenuePage, testPage, "useRefresh"));

});

describe("VenuePage (list)", () => {

  const dataList = [{ venues: { data: [{ id: "id-a" }] } }, { id: "id-a" }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  const testPage = (data) => testSnapshot({ venues: { data: [data] } });

  it("should match snapshot (favorites)", () => testPage({ favorites: [{}] }));

  it("should match snapshot (rsvps)", () => testPage({ rsvps: [{}] }));

});

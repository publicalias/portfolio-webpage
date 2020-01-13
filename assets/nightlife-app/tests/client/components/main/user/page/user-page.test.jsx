"use strict";

//local imports

const UserPage = require("../../../../../../scripts/client/components/main/user/page/user-page");

const { newUserWithData } = require("../../../../../../schemas");
const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, testMockHook, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(UserPage);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserPage, { lib: { getLocation: jest.fn(() => null) } }));

//user page

describe("UserPage (general)", () => {

  const dataList = [null, { id: "id-a" }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  const testPage = withDataList(testMount, dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUserWithData() }));

  it("should match snapshot (match)", () => testSnapshot({ users: { page: { data: [{ id: "id-a" }] } } }));

  it("should call userClearState conditionally on update", () => {

    const { props, setProps, wrapper } = testPage();

    const { actions: { userClearState } } = props;

    wrapper.mount();

    setProps(null, { id: "id-b" });

    testMock(userClearState, [], []);

    wrapper.unmount();

  });

  it("should call refresh conditionally on update", async () => {

    const { props, setProps, wrapper } = testPage();

    const { actions: { userGetItem } } = props;

    const { lib: { getLocation } } = UserPage.injected;

    wrapper.mount();

    setProps({ ready: true });
    setProps(null, { id: "id-b" });

    await Promise.resolve();

    testMock(getLocation, [{}], [{}]);
    testMock(userGetItem, ["id-a", null], ["id-b", null]);

    wrapper.unmount();

  });

  it("should call useRefresh on update", () => testMockHook(UserPage, testPage, "useRefresh"));

});

describe("UserPage (list)", () => {

  const dataList = [{ users: { page: { data: [{ id: "id-a" }] } } }, { id: "id-a" }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  const testPage = (data) => testSnapshot({ users: { page: { data: [data] } } });

  const testFriends = (from) => testPage({
    data: {
      friends: [{
        from: { id: from ? "id-a" : "id-b" },
        to: { id: from ? "id-b" : "id-a" }
      }]
    }
  });

  it("should match snapshot (favorites)", () => testPage({ data: { favorites: [{}] } }));

  it("should match snapshot (friends, from)", () => testFriends(true));

  it("should match snapshot (friends, to)", () => testFriends());

});

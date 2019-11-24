"use strict";

//local imports

const UserPage = require("../../../../../../scripts/client/components/main/user/page/user-page");

const { newUserWithData } = require("../../../../../../schemas");
const { getGeoPoint, testWrapper } = require("../../../../test-helpers");

//global imports

const { deepCopy } = require("all/utilities");
const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(UserPage);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserPage, { lib: { getLocation: jest.fn((user) => user.data.location) } }));

//user page

describe("UserPage (general)", () => {

  const dataList = [null, { id: "id-a" }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  const testPage = withDataList(testMount, dataList);

  const testLoadA = (fn) => {

    const { props, setProps, wrapper } = testPage();

    wrapper.mount();

    setProps(null, { id: "id-b" });

    fn(props);

    wrapper.unmount();

  };

  const testLoadB = async (fn) => {

    const userData = {
      a: { data: { location: null } },
      b: { data: { avatar: "https://www.example.com/avatar.jpg" } },
      c: { data: { location: getGeoPoint(0) } }
    };

    const list = [
      [{ user: userData.a }],
      [{ ready: true }],
      [{ notifications: { friends: [{}] } }],
      [null, { id: "id-b" }],
      [{ user: userData.b }],
      [{ user: userData.c }]
    ];

    const { props, setProps, wrapper } = testPage();

    wrapper.mount();

    for (const e of list) {
      setProps(...e);
    }

    await Promise.resolve();

    fn(props, userData);

    wrapper.unmount();

  };

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUserWithData() }));

  it("should match snapshot (match)", () => testSnapshot({ users: { data: [{ id: "id-a" }] } }));

  it("should call userClearState conditionally on update", () => testLoadA((props) => {

    const { actions: { userClearState } } = props;

    testMock(userClearState, [], []);

  }));

  it("should call initUserData conditionally on update", () => testLoadB((props, userData) => {

    const { actions: { friendGetList, metaGetUser, userGetItem } } = props;

    const { lib: { getLocation } } = UserPage.injected;

    const [innerA, innerB, innerC] = Object.values(userData).map((e, i, arr) => [deepCopy(e, arr[i - 1])]);

    const [outerA, outerB, outerC] = [
      ["id-a", null],
      ["id-b", null],
      ["id-b", getGeoPoint(0)]
    ];

    testMock(friendGetList, [], [], [], [], []);
    testMock(metaGetUser, [], [], [], [], []);
    testMock(getLocation, innerA, innerA, innerA, innerB, innerC);
    testMock(userGetItem, outerA, outerA, outerB, outerB, outerC);

  }));

});

describe("UserPage (list)", () => {

  const dataList = [{ users: { data: [{ id: "id-a" }] } }, { id: "id-a" }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  const testPage = (data) => testSnapshot({ users: { data: [data] } });

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

"use strict";

//local imports

const UserItem = require("../../../../../../scripts/client/components/main/user/list/user-item");

const { newUserData } = require("../../../../../../schemas");
const { testWrapper } = require("../../../../test-helpers");

//global imports

const { placeholder } = require("all/utilities");
const { initTestEvent, initTestSnapshot, testMockHook, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(UserItem);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserItem, {
  lib: {
    delimit: jest.fn((x) => x),
    useLazyLoading: jest.fn(() => false)
  }
}));

//user item

describe("UserItem", () => {

  const dataList = [null, {
    userData: newUserData({
      id: "id-a",
      data: { avatar: "https://www.example.com/avatar.jpg" }
    })
  }];

  const testItem = withDataList(testShallow, dataList);

  const testSnapshot = initTestSnapshot(testItem);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { userData: { name: "User A" } }));

  it("should match snapshot (visible)", () => {

    UserItem.injected.lib.useLazyLoading = jest.fn(() => true);

    testSnapshot();

  });

  it("should call handleError on error", () => {

    const event = { target: { src: "" } };

    const testError = initTestEvent(testItem, "error", event);

    return testError(".qa-error-image", [], () => {
      expect(event.target.src).toEqual(placeholder(800, 450));
    });

  });

  it("should call useLazyLoading on update", () => testMockHook(
    UserItem,
    testMount,
    "useLazyLoading",
    dataList
  ));

});

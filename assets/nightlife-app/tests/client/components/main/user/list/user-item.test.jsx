"use strict";

//local imports

const UserItem = require("../../../../../../scripts/client/components/main/user/list/user-item");

const { newUserData } = require("../../../../../../schemas");
const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(UserItem);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserItem, { lib: { delimit: jest.fn((x) => x) } }));

//user item

describe("UserItem", () => {

  const testItem = withDataList(testShallow, [null, {
    userData: newUserData({
      id: "id-a",
      data: { avatar: "https://www.example.com/avatar.jpg" }
    })
  }]);

  const testSnapshot = initTestSnapshot(testItem);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { userData: { name: "User A" } }));

  it("should call handleError on error", () => {

    const event = { target: { src: "" } };
    const placeholder = "https://via.placeholder.com/800x450?text=undefined";

    const testError = initTestEvent(testItem, "error", event);

    return testError(".qa-error-image", [], () => {
      expect(event.target.src).toEqual(placeholder);
    });

  });

});

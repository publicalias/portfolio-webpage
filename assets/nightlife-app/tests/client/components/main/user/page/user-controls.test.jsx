"use strict";

//local imports

const UserControls = require("../../../../../../scripts/client/components/main/user/page/user-controls");

const { newUserData, newUserWithData } = require("../../../../../../schemas");
const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(UserControls);

const testControls = withDataList(testShallow, [{ user: newUserWithData({ id: "id-a" }) }, {
  userData: newUserData({
    name: "User B",
    id: "id-b"
  })
}]);

const getList = (from) => ({
  friends: [{
    id: "id-c",
    from: { id: from ? "id-a" : "id-b" },
    to: { id: from ? "id-b" : "id-a" }
  }]
});

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserControls));

//user controls

describe("UserControls (snapshots)", () => {

  const testSnapshot = initTestSnapshot(testControls);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (friend, from)", () => testSnapshot(null, { userData: { data: getList(true) } }));

  it("should match snapshot (friend, to)", () => testSnapshot(null, { userData: { data: getList() } }));

  it("should match snapshot (pending, from)", () => testSnapshot({ notifications: getList(true) }));

  it("should match snapshot (pending, to)", () => testSnapshot({ notifications: getList() }));

  it("should match snapshot (blocked)", () => testSnapshot({ user: { data: { blocks: ["id-b"] } } }));

});

describe("UserControls (events)", () => {

  const testClick = (qa) => (...args) => initTestEvent(testControls, "click")(qa, ...args);

  const testFriend = testClick(".qa-click-friend");
  const testBlock = testClick(".qa-toggle-block");

  it("should call handleFriend on click (default)", () => testFriend(
    [],
    ["friendAdd", ["User B", "id-b"]]
  ));

  it("should call handleFriend on click (friend, from)", () => testFriend(
    [null, { userData: { data: getList(true) } }],
    ["friendRemove", ["id-c"]]
  ));

  it("should call handleFriend on click (friend, to)", () => testFriend(
    [null, { userData: { data: getList() } }],
    ["friendRemove", ["id-c"]]
  ));

  it("should call handleBlock on click", () => testBlock(
    [],
    ["userToggleBlock", ["id-b"]]
  ));

});

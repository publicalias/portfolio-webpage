"use strict";

//local imports

const SidebarInput = require("../../../../scripts/client/components/sidebar/sidebar-input");

const { newUserWithData } = require("../../../../schemas");
const { getGeoPoint, testWrapper } = require("../../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(SidebarInput);

const userData = {
  address: "12345",
  avatar: "https://www.example.com/avatar.jpg",
  location: getGeoPoint(0)
};

const testSnapshot = initTestSnapshot(testShallow);

const testChange = (render, type, text) => {

  const testChange = initTestEvent(render, "change", { target: { value: text } });

  return testChange(".qa-account-input", [], [`metaSet${type}`, [text]]);

};

const testClick = (render, type, text) => {

  const testClick = initTestEvent(render, "click");

  const dataList = [{
    account: {
      [type.toLowerCase()]: text
    }
  }];

  const { lib: { getLocation } } = SidebarInput.injected;

  const fnList = [
    () => {
      testMock(getLocation, []);
    },
    [`metaSave${type}`, [text, userData.location]],
    [`metaSet${type}`, [""]],
    ["metaGetUser", []]
  ];

  return testClick(".qa-account-submit", dataList, ...fnList);

};

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(SidebarInput, { lib: { getLocation: jest.fn(() => userData.location) } }));

//sidebar input

describe("sidebar input (address)", () => {

  const { address } = userData;

  const dataList = [{ user: newUserWithData() }, { type: "address" }];

  const testAddress = withDataList(testSnapshot, dataList);
  const testAddressMount = withDataList(testMount, dataList);

  const testBool = withDataList(testAddress, [{ user: { data: { address } } }]);

  it("should match snapshot (default)", () => testAddress());

  it("should match snapshot (bool)", () => testBool());

  it("should match snapshot (bool, text)", () => testBool({ account: { address } }));

  it("should call handleChange on change", () => testChange(testAddressMount, "Address", address));

  it("should call handleSubmit on click", () => testClick(testAddressMount, "Address", address));

});

describe("sidebar input (avatar)", () => {

  const { avatar } = userData;

  const dataList = [{ user: newUserWithData() }, { type: "avatar" }];

  const testAvatar = withDataList(testSnapshot, dataList);
  const testAvatarMount = withDataList(testMount, dataList);

  const testBool = withDataList(testAvatar, [{ user: { data: { avatar } } }]);

  it("should match snapshot (default)", () => testAvatar());

  it("should match snapshot (bool)", () => testBool());

  it("should match snapshot (bool, text)", () => testBool({ account: { avatar } }));

  it("should call handleChange on change", () => testChange(testAvatarMount, "Avatar", avatar));

  it("should call handleSubmit on click", () => testClick(testAvatarMount, "Avatar", avatar));

});

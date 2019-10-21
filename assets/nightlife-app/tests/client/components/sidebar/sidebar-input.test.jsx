"use strict";

//local imports

const SidebarInput = require("../../../../scripts/client/components/sidebar/sidebar-input");

const { newUserWithData } = require("../../../../schemas");
const { testWrapper } = require("../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(SidebarInput);

const testSnapshot = initTestSnapshot(testShallow);

const address = "12345";
const avatar = "https://www.example.com/avatar.jpg";

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

  const fnList = [
    [`metaSave${type}`, [text]],
    [`metaSet${type}`, [""]],
    ["metaGetUser", []]
  ];

  return testClick(".qa-account-submit", dataList, ...fnList);

};

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(SidebarInput));

//sidebar input

describe("sidebar input (address)", () => {

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

"use strict";

//local imports

const SidebarInput = require("../../../../scripts/client/components/sidebar/sidebar-input");

const { newUserWithData } = require("../../../../schemas");
const { getGeoPoint, testWrapper } = require("../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(SidebarInput);

const userData = {
  address: "12345",
  avatar: "https://www.example.com/avatar.jpg",
  location: getGeoPoint(0)
};

const initTestInput = (render, type, text, prop = type.toLowerCase()) => ({

  testChange() {

    const testChange = initTestEvent(render, "change", { target: { value: text } });

    return testChange(".qa-change-input", [], [`metaSet${type}`, [text]]);

  },

  testClick() {

    const testClick = initTestEvent(render, "click");

    const { lib: { getLocation } } = SidebarInput.injected;

    return testClick(
      ".qa-submit-input",
      [{
        account: {
          [prop]: text
        }
      }],
      () => {
        testMock(getLocation, []);
      },
      [`metaSave${type}`, [text, userData.location]],
      [`metaSet${type}`, [""]],
      ["metaGetUser", []]
    );

  }

});

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(SidebarInput, { lib: { getLocation: jest.fn(() => userData.location) } }));

//sidebar input

describe("SidebarInput (address)", () => {

  const { address } = userData;

  const testInput = withDataList(testShallow, [{ user: newUserWithData() }, { type: "address" }]);

  const testSnapshot = initTestSnapshot(testInput);
  const testBool = withDataList(testSnapshot, [{ user: { data: { address } } }]);

  const { testChange, testClick } = initTestInput(testInput, "Address", address);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (bool)", () => testBool());

  it("should match snapshot (bool, text)", () => testBool({ account: { address } }));

  it("should call handleChange on change", () => testChange());

  it("should call handleSubmit on click", () => testClick());

});

describe("SidebarInput (avatar)", () => {

  const { avatar } = userData;

  const testInput = withDataList(testShallow, [{ user: newUserWithData() }, { type: "avatar" }]);

  const testSnapshot = initTestSnapshot(testInput);
  const testBool = withDataList(testSnapshot, [{ user: { data: { avatar } } }]);

  const { testChange, testClick } = initTestInput(testInput, "Avatar", avatar);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (bool)", () => testBool());

  it("should match snapshot (bool, text)", () => testBool({ account: { avatar } }));

  it("should call handleChange on change", () => testChange());

  it("should call handleSubmit on click", () => testClick());

});

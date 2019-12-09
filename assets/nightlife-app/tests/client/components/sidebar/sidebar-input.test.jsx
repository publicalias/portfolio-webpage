"use strict";

//local imports

const SidebarInput = require("../../../../scripts/client/components/sidebar/sidebar-input");

const { testWrapper } = require("../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(SidebarInput);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(SidebarInput, { lib: { getLocation: jest.fn(() => null) } }));

//sidebar input

describe("SidebarInput", () => {

  const testInput = withDataList(testShallow, [null, {
    actions: {},
    bool: false,
    placeholder: "Meta",
    text: ""
  }]);

  const testSnapshot = initTestSnapshot(testInput);

  const testChange = initTestEvent(testInput, "change", { target: { value: "Text" } });
  const testClick = initTestEvent(testInput, "click");

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (bool)", () => testSnapshot(null, { bool: true }));

  it("should match snapshot (bool, text)", () => testSnapshot(null, {
    bool: true,
    text: "Text"
  }));

  it("should call handleChange on change", () => {

    const change = jest.fn();

    return testChange(".qa-change-input", [null, { actions: { change } }], () => {
      testMock(change, ["Text"]);
    });

  });

  it("should call handleSubmit on click", () => {

    const { lib: { getLocation } } = SidebarInput.injected;

    const change = jest.fn();
    const submit = jest.fn();

    return testClick(
      ".qa-submit-input",
      [null, {
        actions: {
          change,
          submit
        },
        text: "Text"
      }],
      () => {
        testMock(getLocation, []);
        testMock(submit, ["Text", null]);
        testMock(change, [""]);
      }
    );

  });

});

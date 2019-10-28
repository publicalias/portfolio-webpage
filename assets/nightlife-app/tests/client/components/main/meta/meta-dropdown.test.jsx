"use strict";

//local imports

const MetaDropdown = require("../../../../../scripts/client/components/main/meta/meta-dropdown");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { deepCopy } = require("all/utilities");
const { testMock } = require("redux/tests/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(MetaDropdown);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(MetaDropdown));

//meta dropdown

describe("meta dropdown", () => {

  const dataListA = [null, {
    bool: false,
    handleToggle: jest.fn(),
    handleSelect: jest.fn(() => jest.fn()),
    list: [],
    name: "List"
  }];

  const dataListB = deepCopy(dataListA, [null, {
    bool: true,
    list: [
      ["Item", "select", "item"]
    ]
  }]);

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataListA);

  const testClick = initTestEvent(withDataList(testShallow, dataListB), "click", {});

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (bool)", () => testSnapshot(null, { bool: true }));

  it("should match snapshot (list)", () => testSnapshot(...dataListB));

  it("should call handleToggle on click (toggle)", () => {

    const handleToggle = jest.fn();

    return testClick(".qa-toggle-list", [null, { handleToggle }], () => {
      testMock(handleToggle, [{}]);
    });

  });

  it("should call handleSelect on click (item)", () => {

    const select = jest.fn();
    const handleSelect = jest.fn(() => select);

    return testClick(".qa-select-item", [null, { handleSelect }], () => {
      testMock(handleSelect, ["select", "item"]);
      testMock(select, [{}]);
    });

  });

});

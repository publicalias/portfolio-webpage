"use strict";

//local imports

const MetaPollInput = require("../../../../../scripts/client/components/main/meta/meta-poll-input");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(MetaPollInput);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(MetaPollInput));

//meta poll input

describe("MetaPollInput", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, {
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    value: ""
  }]);

  const testChange = initTestEvent(testShallow, "change", {});

  const testSubmit = initTestEvent(testShallow, "click", {});

  it("should match snapshot", () => testSnapshot());

  it("should call handleChange on change", () => {

    const handleChange = jest.fn();

    return testChange(".qa-change-input", [null, { handleChange }], () => {
      testMock(handleChange, [{}]);
    });

  });

  it("should call handleSubmit on click", () => {

    const handleSubmit = jest.fn();

    return testSubmit(".qa-submit-input", [null, { handleSubmit }], () => {
      testMock(handleSubmit, [{}]);
    });

  });

});

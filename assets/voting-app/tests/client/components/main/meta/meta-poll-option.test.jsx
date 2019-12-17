"use strict";

//local imports

const MetaPollOption = require("../../../../../scripts/client/components/main/meta/meta-poll-option");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(MetaPollOption);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(MetaPollOption));

//meta poll option

describe("MetaPollOption", () => {

  const testOption = withDataList(testShallow, [null, {
    fill: "black",
    handleRemove: jest.fn(),
    handleVote: jest.fn(),
    text: "Option A"
  }]);

  const testSnapshot = initTestSnapshot(testOption);

  const testClick = initTestEvent(testOption, "click", {});

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (created)", () => testSnapshot(null, { created: true }));

  it("should match snapshot (voted)", () => testSnapshot(null, { voted: true }));

  it("should call handleVote on click", () => {

    const handleVote = jest.fn();

    return testClick(".qa-click-vote", [null, { handleVote }], () => {
      testMock(handleVote, [{}]);
    });

  });

  it("should call handleRemove on click", () => {

    const handleRemove = jest.fn();

    return testClick(".qa-click-remove", [null, {
      created: true,
      handleRemove
    }], () => {
      testMock(handleRemove, [{}]);
    });

  });

});

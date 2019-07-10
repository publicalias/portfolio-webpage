"use strict";

//local imports

const ViewControls = require("../../../../scripts/components/main/view/view-controls");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//view controls

describe("view controls", () => {

  const { testMount, testShallow } = testWrapper(ViewControls);

  const testSnapshot = initTestSnapshot(testShallow);
  const testClick = initTestEvent(testMount, "click");

  it("should match snapshot (default)", () => testSnapshot(null, { poll: newPoll() }));

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }, { poll: newPoll() }));

  it("should call writeText on click", () => {

    navigator.clipboard = { writeText: jest.fn() };

    return testClick(".qa-share-poll", [null, { poll: newPoll() }], () => {
      testMock(navigator.clipboard.writeText, [location.href]);
    });

  });

});

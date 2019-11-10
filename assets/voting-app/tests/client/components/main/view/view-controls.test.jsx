"use strict";

//local imports

const ViewControls = require("../../../../../scripts/client/components/main/view/view-controls");

const { newPoll } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(ViewControls);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ViewControls));

//view controls

describe("ViewControls", () => {

  const testControls = withDataList(testShallow, [null, { poll: newPoll() }]);

  const testSnapshot = initTestSnapshot(testControls);

  const testClick = initTestEvent(testControls, "click");

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

  it("should call handleShare on click", () => {

    navigator.clipboard = { writeText: jest.fn() };

    return testClick(".qa-share-poll", [], () => {
      testMock(navigator.clipboard.writeText, [location.href]);
    });

  });

});

"use strict";

//local imports

const ViewControls = require("../../../../scripts/components/main/view/view-controls");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//view controls

describe("view controls", () => {

  const { testMount, testShallow } = testWrapper(ViewControls);

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot({}, { poll: newPoll() }));

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }, { poll: newPoll() }));

  it("should call writeText on click", () => {

    const { wrapper } = testMount({}, { poll: newPoll() });

    const writeText = jest.fn();

    navigator.clipboard = { writeText };

    wrapper.find(".qa-share-poll").simulate("click");

    testMock(writeText, [location.href]);

    wrapper.unmount();

  });

});

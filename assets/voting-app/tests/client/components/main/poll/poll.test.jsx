"use strict";

//local imports

const Poll = require("../../../../../scripts/client/components/main/poll/poll");

const { initTestPoll, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(Poll);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(Poll));

//poll

describe("poll (form)", () => {

  const testForm = initTestPoll(testSnapshot, "form");

  it("should match snapshot (default)", () => testForm());

  it("should match snapshot (authenticated)", () => testForm({ user: newUser() }));

  it("should match snapshot (options)", () => testForm(null, { options: ["Option A"] }));

});

describe("poll (view)", () => {

  const testView = initTestPoll(testSnapshot, "view");

  const testPoll = withDataList(testView, [{
    user: newUser(),
    polls: [{ id: "id-a" }]
  }]);

  it("should match snapshot (default)", () => testView());

  it("should match snapshot (authenticated)", () => testView({ user: newUser() }));

  it("should match snapshot (authenticated, wrong poll)", () => testPoll(null, { id: "id-b" }));

  it("should match snapshot (authenticated, right poll)", () => testPoll(null, { id: "id-a" }));

  it("should match snapshot (options)", () => testView(null, { options: [{}] }));

});

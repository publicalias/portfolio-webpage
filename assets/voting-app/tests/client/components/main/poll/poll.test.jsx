"use strict";

//local imports

const Poll = require("../../../../../scripts/client/components/main/poll/poll");

const { initTestPoll, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(Poll);

const testForm = initTestPoll(testShallow, "form");
const testView = initTestPoll(testShallow, "view");

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(Poll));

//poll

describe("poll (form)", () => {

  const testSnapshot = initTestSnapshot(testForm);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

  it("should match snapshot (options)", () => testSnapshot(null, { options: ["Option A"] }));

});

describe("poll (view)", () => {

  const testSnapshot = initTestSnapshot(testView);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

  it("should match snapshot (authenticated, match)", () => testSnapshot({
    user: newUser(),
    polls: [{ id: "id-a" }]
  }, {
    id: "id-a"
  }));

  it("should match snapshot (options)", () => testSnapshot(null, { options: [{}] }));

});

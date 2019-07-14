"use strict";

//local imports

const PollOptions = require("../../../../scripts/components/main/poll/poll-options");

const { initTestPoll, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newOption, newPoll } = require("schemas/voting-app");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const { testShallow } = testWrapper(PollOptions);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollOptions));

//poll options

describe("poll options (form)", () => {

  const testForm = initTestPoll(testSnapshot, "form");

  it("should match snapshot", () => testForm());

  it("should match snapshot (poll list)", () => testForm(null, { options: ["Option A"] }));

  it("should match snapshot (poll input)", () => testForm({ user: newUser() }));

});

describe("poll options (view)", () => {

  const testView = initTestPoll(testSnapshot, "view");

  it("should match snapshot", () => testView());

  it("should match snapshot (poll list)", () => testView(null, { options: [newOption()] }));

  it("should match snapshot (poll input)", () => testView({
    user: newUser(),
    polls: [newPoll({ id: "id-a" })]
  }, {
    id: "id-a"
  }));

});

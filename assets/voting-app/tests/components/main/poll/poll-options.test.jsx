"use strict";

//local imports

const PollOptions = require("../../../../scripts/components/main/poll/poll-options");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newForm, newOption, newPoll } = require("schemas/voting-app");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//poll options

describe("poll options", () => {

  const { testShallow } = testWrapper(PollOptions);

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (form)", () => testSnapshot(null, {
    poll: newForm(),
    role: "form"
  }));

  it("should match snapshot (form, list)", () => testSnapshot(null, {
    poll: newForm({ options: ["Option A"] }),
    role: "form"
  }));

  it("should match snapshot (form, input)", () => testSnapshot({ user: newUser() }, {
    poll: newForm(),
    role: "form"
  }));

  it("should match snapshot (view)", () => testSnapshot(null, {
    poll: newPoll(),
    role: "view"
  }));

  it("should match snapshot (view, list)", () => testSnapshot(null, {
    poll: newPoll({ options: [newOption("Option A")] }),
    role: "view"
  }));

  it("should match snapshot (view, input)", () => testSnapshot({
    user: newUser(),
    polls: [newPoll({ id: "id-a" })]
  }, {
    poll: newPoll({ id: "id-a" }),
    role: "view"
  }));

});

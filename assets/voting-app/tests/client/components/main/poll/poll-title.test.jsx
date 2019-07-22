"use strict";

//local imports

const PollTitle = require("../../../../../scripts/client/components/main/poll/poll-title");

const { initTestPoll, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas");
const { initTestEvent, initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(PollTitle);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollTitle));

//poll title

describe("poll title (form)", () => {

  const testForm = initTestPoll(testSnapshot, "form");
  const testFormMount = initTestPoll(testMount, "form");

  const testBlur = initTestEvent(testFormMount, "blur", { target: { value: "Title A" } });

  it("should match snapshot (default)", () => testForm());

  it("should match snapshot (author)", () => testForm({ user: newUser({ name: "Author A" }) }));

  it("should call formSetTitle on blur", () => testBlur(".qa-title-input", [], ["formSetTitle", ["Title A"]]));

});

describe("poll title (view)", () => {

  const testView = initTestPoll(testSnapshot, "view");

  it("should match snapshot (default)", () => testView());

  it("should match snapshot (title)", () => testView(null, { title: "Title A" }));

  it("should match snapshot (author)", () => testView(null, { author: "Author A" }));

});
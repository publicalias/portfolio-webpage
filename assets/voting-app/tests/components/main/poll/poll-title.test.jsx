"use strict";

//local imports

const PollTitle = require("../../../../scripts/components/main/poll/poll-title");

const { initTestPoll, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
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

  const testChange = initTestEvent(testFormMount, "change", { target: { value: "Title A" } });

  it("should match snapshot", () => testForm());

  it("should match snapshot (title)", () => testForm(null, { title: "Title A" }));

  it("should match snapshot (author)", () => testForm({ user: newUser({ name: "Author A" }) }));

  it("should call formSetTitle on change", () => testChange(".qa-title-input", [], ["formSetTitle", ["Title A"]]));

});

describe("poll title (view)", () => {

  const testView = initTestPoll(testSnapshot, "view");

  it("should match snapshot", () => testView());

  it("should match snapshot (title)", () => testView(null, { title: "Title A" }));

  it("should match snapshot (author)", () => testView(null, { author: "Author A" }));

});

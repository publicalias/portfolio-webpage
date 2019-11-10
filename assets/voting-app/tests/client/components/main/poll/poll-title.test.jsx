"use strict";

//local imports

const PollTitle = require("../../../../../scripts/client/components/main/poll/poll-title");

const { initTestPoll, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestEvent, initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(PollTitle);

const testForm = initTestPoll(testShallow, "form");
const testView = initTestPoll(testShallow, "view");

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollTitle));

//poll title

describe("PollTitle (form)", () => {

  const testSnapshot = initTestSnapshot(testForm);

  const testBlur = initTestEvent(testForm, "blur", { target: { value: "Title A" } });

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (author)", () => testSnapshot({ user: newUser({ name: "Author A" }) }));

  it("should call handleBlur on blur", () => testBlur(
    ".qa-title-input",
    [],
    ["formSetTitle", ["Title A"]],
    ["formCheckTitle", ["Title A"]]
  ));

});

describe("PollTitle (view)", () => {

  const testSnapshot = initTestSnapshot(testView);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (title)", () => testSnapshot(null, { title: "Title A" }));

  it("should match snapshot (author)", () => testSnapshot(null, { author: "Author A" }));

});

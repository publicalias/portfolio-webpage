"use strict";

//local imports

const PollList = require("../../../../scripts/components/main/poll/poll-list");

const { initTestPoll, testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { initTestEvent, initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//poll list

describe("poll list (form)", () => {

  const { testShallow } = testWrapper(PollList);

  const testSnapshot = initTestSnapshot(testShallow);
  const testForm = initTestPoll(testSnapshot, "form");

  it("should match snapshot (default)", () => testForm());

  it("should match snapshot (authenticated)", () => testForm({ user: newUser() }));

  it("should match snapshot (options)", () => testForm(null, { options: ["Option A"] }));

});

describe("poll list (view)", () => {

  const { testShallow } = testWrapper(PollList);

  const testSnapshot = initTestSnapshot(testShallow);
  const testView = initTestPoll(testSnapshot, "view");

  it("should match snapshot (default)", () => testView());

  it("should match snapshot (authenticated)", () => testView({ user: newUser() }));

  it("should match snapshot (options)", () => testView(null, { options: [{}] }));

  it("should match snapshot (options, created poll)", () => testView({ user: newUser({ id: "id-a" }) }, {
    users: { created: "id-a" },
    options: [{}]
  }));

  it("should match snapshot (options, created option)", () => {

    const dataList = [{ user: newUser({ id: "id-a" }) }, { options: [{ created: "id-a" }] }];

    testView(...dataList);

  });

});

describe("poll list (form, events)", () => {

  const { testMount } = testWrapper(PollList);

  const testFormMount = initTestPoll(testMount, "form");
  const testClick = initTestEvent(testFormMount, "click");

  const dataList = [null, { options: ["Option A"] }];

  it("should do nothing on click (vote)", () => testClick(".qa-option-vote", dataList, ["pollCastVote"]));

  it("should call formRemoveOption on click (remove)", () => {

    const fn = ["formRemoveOption", ["Option A"]];

    return testClick(".qa-option-remove", dataList, fn);

  });

});

describe("poll list (view, events)", () => {

  const { testMount } = testWrapper(PollList);

  const testViewMount = initTestPoll(testMount, "view");

  it("should call pollCastVote on click (vote)", () => {

    const dataList = [null, {
      id: "id-a",
      options: [{ text: "Option A" }]
    }];

    return testReload(testViewMount, dataList, ".qa-option-vote", "id-a", ["pollCastVote", ["id-a", "Option A"]]);

  });

  it("should call pollRemoveOption on click (remove)", () => {

    const dataList = [{ user: newUser({ id: "id-a" }) }, {
      id: "id-b",
      options: [{
        text: "Option A",
        created: "id-a"
      }]
    }];

    return testReload(testViewMount, dataList, ".qa-option-remove", "id-b", ["pollRemoveOption", ["id-b", "Option A"]]);

  });

});

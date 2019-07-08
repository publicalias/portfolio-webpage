"use strict";

//local imports

const PollList = require("../../../../scripts/components/main/poll/poll-list");

const { initTestPoll, testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

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

    const data = { user: newUser({ id: "id-a" }) };
    const pollData = { options: [{ created: "id-a" }] };

    testView(data, pollData);

  });

});

describe("poll list (form, events)", () => {

  const { testMount } = testWrapper(PollList);

  const testForm = initTestPoll(testMount, "form");

  it("should do nothing on click (vote)", () => {

    const { props, wrapper } = testForm(null, { options: ["Option A"] });

    const { actions: { pollCastVote } } = props;

    wrapper.find(".qa-option-vote").simulate("click");

    testMock(pollCastVote);

    wrapper.unmount();

  });

  it("should call formRemoveOption on click (remove)", () => {

    const { props, wrapper } = testForm(null, { options: ["Option A"] });

    const { actions: { formRemoveOption } } = props;

    wrapper.find(".qa-option-remove").simulate("click");

    testMock(formRemoveOption, ["Option A"]);

    wrapper.unmount();

  });

});

describe("poll list (view, events)", () => {

  const { testMount } = testWrapper(PollList);

  const testView = initTestPoll(testMount, "view");

  it("should call pollCastVote on click (vote)", () => {

    const { props, wrapper } = testView(null, {
      id: "id-a",
      options: [{ text: "Option A" }]
    });

    return testReload(props, wrapper, ".qa-option-vote", "pollCastVote", ["id-a", "Option A"]);

  });

  it("should call pollRemoveOption on click (remove)", () => {

    const { props, wrapper } = testView({ user: newUser({ id: "id-a" }) }, {
      id: "id-b",
      options: [{
        text: "Option A",
        created: "id-a"
      }]
    });

    return testReload(props, wrapper, ".qa-option-remove", "pollRemoveOption", ["id-b", "Option A"]);

  });

});

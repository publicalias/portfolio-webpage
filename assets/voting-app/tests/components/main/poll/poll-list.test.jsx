"use strict";

//local imports

const PollList = require("../../../../scripts/components/main/poll/poll-list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newForm, newPoll } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const initTestForm = (testFn) => (data, poll) => testFn(data, {
  poll: newForm(poll),
  role: "form"
});

const initTestView = (testFn) => (data, poll) => testFn(data, {
  poll: newPoll(poll),
  role: "view"
});

const testVote = async (render, poll, mockArgs = []) => {

  const [a, b, c] = mockArgs;

  const { props, wrapper } = render(null, poll);

  const { actions: { metaGetPolls, metaGetUser, pollCastVote } } = props;

  wrapper.find(".qa-option-vote").simulate("click");

  testMock(pollCastVote, a);

  await Promise.resolve();

  testMock(metaGetUser, b);
  testMock(metaGetPolls, c);

};

//setup

beforeAll(reactTests.setup);

//poll list

describe("poll list (form)", () => {

  const { testShallow } = testWrapper(PollList);

  const testSnapshot = initTestSnapshot(testShallow);
  const testForm = initTestForm(testSnapshot);

  it("should match snapshot (default)", () => testForm());

  it("should match snapshot (authenticated)", () => testForm({ user: newUser() }));

  it("should match snapshot (options)", () => testForm(null, { options: ["Option A"] }));

});

describe("poll list (view)", () => {

  const { testShallow } = testWrapper(PollList);

  const testSnapshot = initTestSnapshot(testShallow);
  const testView = initTestView(testSnapshot);

  it("should match snapshot (default)", () => testView());

  it("should match snapshot (authenticated)", () => testView({ user: newUser() }));

  it("should match snapshot (options)", () => testView(null, { options: [{}] }));

  it("should match snapshot (options, created poll)", () => testView({ user: newUser({ id: "id-a" }) }, {
    users: { created: "id-a" },
    options: [{}]
  }));

  it("should match snapshot (options, created option)", () => {

    const data = { user: newUser({ id: "id-a" }) };
    const poll = { options: [{ created: "id-a" }] };

    testView(data, poll);

  });

});

describe("poll list (form, events)", () => {

  const { testMount } = testWrapper(PollList);

  const testForm = initTestForm(testMount);

  it("should do nothing on click (vote)", () => testVote(testForm, { options: ["Option A"] }));

  it("should call formRemoveOption on click (remove)", () => {

    const { props, wrapper } = testForm(null, { options: ["Option A"] });

    const { actions: { formRemoveOption } } = props;

    wrapper.find(".qa-option-remove").simulate("click");

    testMock(formRemoveOption, ["Option A"]);

  });

});

describe("poll list (view, events)", () => {

  const { testMount } = testWrapper(PollList);

  const testView = initTestView(testMount);

  it("should call pollCastVote on click (vote)", () => testVote(testView, {
    id: "id-a",
    options: [{ text: "Option A" }]
  }, [
    ["id-a", "Option A"],
    [],
    [null, "id-a"]
  ]));

  it("should call pollRemoveOption on click (remove)", async () => {

    const { props, wrapper } = testView({ user: newUser({ id: "id-a" }) }, {
      id: "id-b",
      options: [{
        text: "Option A",
        created: "id-a"
      }]
    });

    const { actions: { metaGetPolls, metaGetUser, pollRemoveOption } } = props;

    wrapper.find(".qa-option-remove").simulate("click");

    testMock(pollRemoveOption, ["id-b", "Option A"]);

    await Promise.resolve();

    testMock(metaGetUser, []);
    testMock(metaGetPolls, [null, "id-b"]);

  });

});

"use strict";

//local imports

const PollList = require("../../../../scripts/components/main/poll/poll-list");

const { initTestPoll, testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { initTestEvent, initTestSnapshot, reactTests, withDataList } = require("test-helpers/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(PollList);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollList, { lib: { chartColor: jest.fn(() => "rgba(0, 0, 0, 0.75)") } }));

//poll list

describe("poll list (form)", () => {

  const testForm = withDataList(initTestPoll(testSnapshot, "form"), [null, { options: ["Option A"] }]);

  it("should match snapshot (default)", () => testForm());

  it("should match snapshot (authenticated)", () => testForm({ user: newUser() }));

});

describe("poll list, (form, events)", () => {

  const testFormMount = withDataList(initTestPoll(testMount, "form"), [null, { options: ["Option A"] }]);

  const testClick = initTestEvent(testFormMount, "click");

  it("should do nothing on click (vote)", () => testClick(".qa-option-vote", [], ["pollCastVote"]));

  it("should call formRemoveOption on click (remove)", () => {

    const fn = ["formRemoveOption", ["Option A"]];

    return testClick(".qa-option-remove", [], fn);

  });

});

describe("poll list (view)", () => {

  const testView = withDataList(initTestPoll(testSnapshot, "view"), [null, { options: [{ text: "Option A" }] }]);

  it("should match snapshot (default)", () => testView());

  it("should match snapshot (authenticated)", () => testView({ user: newUser() }));

  it("should match snapshot (options, created poll)", () => {

    const dataList = [{ user: newUser({ id: "id-a" }) }, { users: { created: "id-a" } }];

    return testView(...dataList);

  });

  it("should match snapshot (options, created option)", () => {

    const dataList = [{ user: newUser({ id: "id-a" }) }, { options: [{ created: "id-a" }] }];

    return testView(...dataList);

  });

});

describe("poll list (view, events)", () => {

  const testViewMount = withDataList(initTestPoll(testMount, "view"), [null, { options: [{ text: "Option A" }] }]);

  it("should call pollCastVote on click (vote)", () => {

    const dataList = [null, { id: "id-a" }];

    return testReload(testViewMount, dataList, ".qa-option-vote", "id-a", ["pollCastVote", ["id-a", "Option A"]]);

  });

  it("should call pollRemoveOption on click (remove)", () => {

    const dataList = [{ user: newUser({ id: "id-a" }) }, {
      id: "id-b",
      options: [{ created: "id-a" }]
    }];

    return testReload(testViewMount, dataList, ".qa-option-remove", "id-b", ["pollRemoveOption", ["id-b", "Option A"]]);

  });

});

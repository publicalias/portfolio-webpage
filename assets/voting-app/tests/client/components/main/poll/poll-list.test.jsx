"use strict";

//local imports

const PollList = require("../../../../../scripts/client/components/main/poll/poll-list");

const { initTestPoll, testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(PollList);

const testForm = initTestPoll(testShallow, "form");
const testView = initTestPoll(testShallow, "view");

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollList, { lib: { chartColor: jest.fn(() => "rgba(0, 0, 0, 0.75)") } }));

//poll list

describe("poll list (form)", () => {

  const testSnapshot = withDataList(initTestSnapshot(testForm), [null, { options: ["Option A"] }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

});

describe("poll list (form, events)", () => {

  const testClick = initTestEvent(withDataList(testForm, [null, { options: ["Option A"] }]), "click");

  it("should do nothing on click (vote)", () => testClick(".qa-option-vote", [], ["pollCastVote"]));

});

describe("poll list (view)", () => {

  const testSnapshot = withDataList(initTestSnapshot(testView), [null, { options: [{ text: "Option A" }] }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser({ id: "id-a" }) })); //not created

  it("should match snapshot (options, created poll)", () => {

    const dataList = [{ user: newUser({ id: "id-a" }) }, { users: { created: "id-a" } }];

    return testSnapshot(...dataList);

  });

  it("should match snapshot (options, created option)", () => {

    const dataList = [{ user: newUser({ id: "id-a" }) }, { options: [{ created: "id-a" }] }];

    return testSnapshot(...dataList);

  });

  it("should match snapshot (options, voted)", () => {

    const dataList = [{ user: newUser({ id: "id-a" }) }, { options: [{ voted: ["id-a"] }] }];

    return testSnapshot(...dataList);

  });

});

describe("poll list (view, events)", () => {

  const testList = withDataList(testView, [null, { options: [{ text: "Option A" }] }]);

  it("should call pollCastVote on click (vote)", () => {

    const dataList = [null, { id: "id-a" }];

    return testReload(testList, dataList, ".qa-option-vote", "id-a", ["pollCastVote", ["id-a", "Option A"]]);

  });

});

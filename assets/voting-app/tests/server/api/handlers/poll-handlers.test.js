"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/poll-handlers");

const { newOption, newPoll } = require("../../../../schemas");
const { initTestToggle, initTestUnvote, initTestVote, testOptions } = require("../../test-helpers");

//global imports

const { newIPUser, newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail, testInsert } = require("redux/tests/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

//setup

beforeAll(mongoTests.setup);
beforeEach(mongoTests.reset(pollsCol, usersCol));
afterAll(mongoTests.teardown);

//poll add option

describe("pollAddOption", () => {

  const { pollAddOption } = handlers;

  const mockAPICall = initMockAPICall(pollAddOption, "PATCH");

  const getData = (text) => ({
    id: "id-a",
    text
  });

  const testError = async (error, text, options = []) => {

    await pollsCol().insertOne(newPoll({
      id: "id-a",
      options: options.map((e) => ({ text: e }))
    }));

    const res = await mockAPICall(newUser(), getData(text));

    testMock(res.json, [{ errors: [error] }]);

  };

  testOptions(testError);

  it("sends 401 if user is unauthenticated or restricted", () => testAuthFail(mockAPICall, getData()));

  it("sends object if option is valid", async () => {

    const poll = newPoll({ id: "id-a" });

    await pollsCol().insertOne(poll);

    const res = await mockAPICall(newUser({ id: "id-b" }), getData("Option A"));

    const update = await pollsCol().findOne();

    testMock(res.json, [{}]);

    expect(update).toEqual(Object.assign(poll, {
      options: [newOption({
        text: "Option A",
        created: "id-b"
      })]
    }));

  });

});

//poll cast vote

describe("pollCastVote", () => {

  const { pollCastVote } = handlers;

  const mockAPICall = initMockAPICall(pollCastVote, "PATCH");

  const getData = (text) => ({
    id: "id-a",
    text
  });

  const testVote = initTestVote(mockAPICall, getData);

  it("sends object if user is authenticated", () => testVote(newUser({ id: "id-b" })));

  it("sends object if ip user exists", () => testVote(newIPUser({ id: "id-b" })));

  it("sends object if no ip user exists", async () => {

    await testVote();

    await testInsert(usersCol);

  });

});

//poll remove option

describe("pollRemoveOption", () => {

  const { pollRemoveOption } = handlers;

  const mockAPICall = initMockAPICall(pollRemoveOption, "PATCH");

  const getData = (text) => ({
    id: "id-a",
    text
  });

  const testRemove = async (id) => {

    const poll = await pollsCol().findOne();

    const res = await mockAPICall(newUser({ id }), getData("Option A"));

    const update = await pollsCol().findOne();

    testMock(res.json, [{}]);

    expect(update).toEqual(Object.assign(poll, { options: [] }));

  };

  beforeEach(() => pollsCol().insertOne(newPoll({
    id: "id-a",
    users: { created: "id-b" },
    options: [{
      text: "Option A",
      created: "id-c"
    }]
  })));

  it("sends 401 if user is unauthenticated, restricted, or not the creator", () => {

    const args = [mockAPICall, getData("Option A"), [newUser({ id: "id-d" })]];

    return testAuthFail(...args);

  });

  it("sends object if user is valid (poll)", () => testRemove("id-b"));

  it("sends object if user is valid (option)", () => testRemove("id-c"));

});

//poll remove vote

describe("pollRemoveVote", () => {

  const { pollRemoveVote } = handlers;

  const mockAPICall = initMockAPICall(pollRemoveVote, "PATCH");

  const getData = () => ({ id: "id-a" });

  const testUnvote = initTestUnvote(mockAPICall, getData);

  it("sends 401 if no ip user exists", () => testUnvote());

  it("sends object if user is authenticated", () => testUnvote(newUser({ id: "id-b" })));

  it("sends object if ip user exists", () => testUnvote(newIPUser({ id: "id-b" })));

});

//poll toggle flag

describe("pollToggleFlag", () => {

  const { pollToggleFlag } = handlers;

  const mockAPICall = initMockAPICall(pollToggleFlag, "PATCH");

  const getData = () => ({ id: "id-a" });

  const testToggle = initTestToggle(mockAPICall, getData, "flagged");

  it("sends 401 if user is unauthenticated or restricted", () => testAuthFail(mockAPICall, getData()));

  it("sends object if user is valid", () => testToggle(newUser({ id: "id-b" })));

});

//poll toggle hide

describe("pollToggleHide", () => {

  const { pollToggleHide } = handlers;

  const mockAPICall = initMockAPICall(pollToggleHide, "PATCH");

  const getData = () => ({ id: "id-a" });

  const testToggle = initTestToggle(mockAPICall, getData, "hidden");

  it("sends object if user is authenticated", () => testToggle(newUser({ id: "id-b" })));

  it("sends object if ip user exists", () => testToggle(newIPUser({ id: "id-b" })));

  it("sends object if no ip user exists", async () => {

    await testToggle();

    await testInsert(usersCol);

  });

});

//poll toggle secret

describe("pollToggleSecret", () => {

  const { pollToggleSecret } = handlers;

  const mockAPICall = initMockAPICall(pollToggleSecret, "PATCH");

  const getData = () => ({ id: "id-a" });

  const testSecret = async (user) => {

    const toggle = async () => {

      const { secret } = await pollsCol().findOne();

      const res = await mockAPICall(user, getData());

      const update = await pollsCol().findOne();

      testMock(res.json, [{}]);

      expect(update.secret).toEqual(!secret);

    };

    await toggle();
    await toggle();

  };

  beforeEach(() => pollsCol().insertOne(newPoll({
    id: "id-a",
    users: { created: "id-b" }
  })));

  it("sends 401 if user is unauthenticated, restricted, or not the creator", () => {

    const args = [mockAPICall, getData(), [newUser({ id: "id-c" })]];

    return testAuthFail(...args);

  });

  it("sends object if user is valid", () => testSecret(newUser({ id: "id-b" })));

});

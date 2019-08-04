"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/poll-handlers");

const { newPoll } = require("../../../../schemas");
const { initTestVote, initTestToggle, testOptions } = require("../../test-helpers");

//global imports

const { newIPUser, newUser } = require("schemas");
const { testMock } = require("test-helpers/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail } = require("test-helpers/server-tests");

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

    const poll = newPoll(Object.assign({ id: "id-a" }, { options: options.map((e) => ({ text: e })) }));

    await pollsCol().insertOne(poll);

    const res = await mockAPICall(newUser(), getData(text));

    testMock(res.json, [{ errors: [error] }]);

  };

  testOptions(testError);

  it("sends 401 if user is unauthenticated or restricted", () => testAuthFail(mockAPICall, getData()));

  it("sends object if option is valid", async () => {

    const poll = newPoll({ id: "id-a" });
    const user = newUser({ id: "id-b" });

    await pollsCol().insertOne(poll);

    const res = await mockAPICall(user, getData("Option A"));

    const update = await pollsCol().findOne();

    testMock(res.json, [{}]);

    expect(update).toEqual(Object.assign(poll, {
      options: [{
        text: "Option A",
        created: "id-b",
        voted: []
      }]
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

  it("sends object if no ip user exists", () => testVote());

});

//poll remove option

describe("pollRemoveOption", () => {

  const { pollRemoveOption } = handlers;

  const mockAPICall = initMockAPICall(pollRemoveOption, "PATCH");

  const getData = (text) => ({
    id: "id-a",
    text
  });

  const getPoll = () => newPoll({
    id: "id-a",
    users: { created: "id-b" },
    options: [{
      text: "Option A",
      created: "id-c"
    }]
  });

  const testRemove = async (id) => {

    const poll = getPoll();
    const user = newUser({ id });

    await pollsCol().insertOne(poll);

    const res = await mockAPICall(user, getData("Option A"));

    const update = await pollsCol().findOne();

    testMock(res.json, [{}]);

    expect(update).toEqual(Object.assign(poll, { options: [] }));

  };

  it("sends 401 if user is unauthenticated, restricted, or not the creator", async () => {

    const user = newUser({ id: "id-d" });
    const data = getData("Option A");

    await pollsCol().insertOne(getPoll());

    return testAuthFail(mockAPICall, data, [user]);

  });

  it("sends object if user is valid (poll)", () => testRemove("id-b"));

  it("sends object if user is valid (option)", () => testRemove("id-c"));

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

  it("sends object if no ip user exists", () => testToggle());

});

//poll toggle secret

describe("pollToggleSecret", () => {

  const { pollToggleSecret } = handlers;

  const mockAPICall = initMockAPICall(pollToggleSecret, "PATCH");

  const getData = () => ({ id: "id-a" });

  const getPoll = () => newPoll({
    id: "id-a",
    users: { created: "id-b" }
  });

  const testToggle = async (user) => {

    const { secret } = await pollsCol().findOne();

    const res = await mockAPICall(user, getData());

    const update = await pollsCol().findOne();

    testMock(res.json, [{}]);

    expect(update.secret).toEqual(!secret);

  };

  it("sends 401 if user is unauthenticated, restricted, or not the creator", async () => {

    const user = newUser({ id: "id-c" });

    await pollsCol().insertOne(getPoll());

    return testAuthFail(mockAPICall, getData(), [user]);

  });

  it("sends object if user is valid", async () => {

    const user = newUser({ id: "id-b" });

    await pollsCol().insertOne(getPoll());

    await testToggle(user);
    await testToggle(user);

  });

});

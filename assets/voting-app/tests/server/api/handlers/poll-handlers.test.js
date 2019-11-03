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

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData()));

  it("sends noop if successful", async () => {

    await pollsCol().insertOne(newPoll({ id: "id-a" }));

    const res = await mockAPICall(newUser({ id: "id-b" }), getData("Option A"));

    const update = await pollsCol().findOne();

    testMock(res.json, [{}]);

    expect(update.options).toEqual([newOption({
      text: "Option A",
      created: "id-b"
    })]);

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

  it("sends noop if successful (user is authenticated)", () => testVote(newUser({ id: "id-b" })));

  it("sends noop if successful (ip user exists)", () => testVote(newIPUser({ id: "id-b" })));

  it("sends noop if successful (no ip user exists)", async () => {

    await testVote();

    await testInsert(usersCol);

  });

});

//poll remove option

describe("pollRemoveOption", () => {

  const { pollRemoveOption } = handlers;

  const mockAPICall = initMockAPICall(pollRemoveOption, "PATCH");

  const getData = () => ({
    id: "id-a",
    text: "Option A"
  });

  const testRemove = async (id) => {

    const res = await mockAPICall(newUser({ id }), getData());

    const update = await pollsCol().findOne();

    testMock(res.json, [{}]);

    expect(update.options).toEqual([]);

  };

  beforeEach(() => pollsCol().insertOne(newPoll({
    id: "id-a",
    users: { created: "id-b" },
    options: [{
      text: "Option A",
      created: "id-c"
    }]
  })));

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData(), [newUser()]));

  it("sends noop if successful (poll)", () => testRemove("id-b"));

  it("sends noop if successful (option)", () => testRemove("id-c"));

});

//poll remove vote

describe("pollRemoveVote", () => {

  const { pollRemoveVote } = handlers;

  const mockAPICall = initMockAPICall(pollRemoveVote, "PATCH");

  const getData = () => ({ id: "id-a" });

  const testUnvote = initTestUnvote(mockAPICall, getData);

  it("sends noop if successful (user is authenticated)", () => testUnvote(newUser({ id: "id-b" })));

  it("sends noop if successful (ip user exists)", () => testUnvote(newIPUser({ id: "id-b" })));

  it("sends status if authentication fails (no ip user exists)", () => testUnvote());

});

//poll toggle flag

describe("pollToggleFlag", () => {

  const { pollToggleFlag } = handlers;

  const mockAPICall = initMockAPICall(pollToggleFlag, "PATCH");

  const getData = () => ({ id: "id-a" });

  const testToggle = initTestToggle(mockAPICall, getData, "flagged");

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData()));

  it("sends noop if successful", () => testToggle(newUser({ id: "id-b" })));

});

//poll toggle hide

describe("pollToggleHide", () => {

  const { pollToggleHide } = handlers;

  const mockAPICall = initMockAPICall(pollToggleHide, "PATCH");

  const getData = () => ({ id: "id-a" });

  const testToggle = initTestToggle(mockAPICall, getData, "hidden");

  it("sends noop if successful (user is authenticated)", () => testToggle(newUser({ id: "id-b" })));

  it("sends noop if successful (ip user exists)", () => testToggle(newIPUser({ id: "id-b" })));

  it("sends noop if successful (no ip user exists)", async () => {

    await testToggle();

    await testInsert(usersCol);

  });

});

//poll toggle secret

describe("pollToggleSecret", () => {

  const { pollToggleSecret } = handlers;

  const mockAPICall = initMockAPICall(pollToggleSecret, "PATCH");

  const getData = () => ({ id: "id-a" });

  beforeEach(() => pollsCol().insertOne(newPoll({
    id: "id-a",
    users: { created: "id-b" }
  })));

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData(), [newUser()]));

  it("sends noop if successful", async () => {

    const user = newUser({ id: "id-b" });

    const toggle = async () => {

      const { secret } = await pollsCol().findOne();

      const res = await mockAPICall(user, getData());

      const update = await pollsCol().findOne();

      testMock(res.json, [{}]);

      expect(update.secret).toEqual(!secret);

    };

    await toggle();
    await toggle();

  });

});

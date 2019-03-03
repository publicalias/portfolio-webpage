"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const handlers = require("../../../scripts/api/handlers/view-handlers");

const { mockList, mockPoll } = require("../../test-helpers");

//global imports

const { mockIPUser, mockUser } = require("test-helpers/mocks");
const { mockAPICall, mongoTests, testAuthFail } = require("test-helpers/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

const initTestVote = (handler, getData) => async (user) => {

  const options = [{ text: "Option A" }, { text: "Option B" }];

  const castVote = async (index) => {

    const data = getData(options[index].text);

    const output = await handler(user || {}, data, "json");

    const [update, actual] = await Promise.all([
      pollsCol().findOne(),
      user || usersCol().findOne()
    ]);

    const polls = [update];

    const checkVote = (val) => {
      expect(update.options[val].voted).toEqual(index === val ? [actual.id] : []);
    };

    expect(output).toEqual(user || index === 1 ? { polls } : {
      polls,
      user: actual
    });

    checkVote(0);
    checkVote(1);

  };

  await Promise.all([
    pollsCol().insertOne(mockPoll({
      id: "id-a",
      options
    })),
    user && "ip" in user && usersCol().insertOne(user)
  ]);

  await castVote(0);
  await castVote(1);

};

//setup

beforeAll(mongoTests.setup);
afterAll(mongoTests.teardown);

afterEach(mongoTests.reset(pollsCol, usersCol));

//view add option

describe("viewAddOption", () => {

  const { viewAddOption } = handlers;

  const handler = mockAPICall(viewAddOption, "PATCH");

  const getData = (text) => ({
    poll: "id-a",
    text,
    list: mockList()
  });

  const testError = async (error, text, data) => {

    const poll = mockPoll(Object.assign({ id: "id-a" }, data));
    const json = { errors: [error] };

    await pollsCol().insertOne(poll);

    expect(await handler(mockUser(), getData(text), "json")).toEqual(json);

  };

  it("sends 401 if user is unauthenticated or restricted", () => testAuthFail(handler, getData()));

  it("sends errors if option is empty", () => testError("Option must not be empty", ""));

  it("sends errors if option is duplicate", () => {

    const data = { options: [{ text: "Option A" }] };

    return testError("Option must be unique", "Option A", data);

  });

  it("sends errors if option is obscene", () => testError("Option must not be obscene", "Fuck"));

  it("sends polls if option is valid", async () => {

    const poll = mockPoll({ id: "id-a" });
    const user = mockUser({ id: "id-b" });

    await pollsCol().insertOne(poll);

    const output = await handler(user, getData("Option A"), "json");
    const update = Object.assign(poll, {
      options: [{
        text: "Option A",
        created: "id-b",
        voted: []
      }]
    });

    expect(output).toEqual({ polls: [update] });

  });

});

//view cast vote

describe("viewCastVote", () => {

  const { viewCastVote } = handlers;

  const handler = mockAPICall(viewCastVote, "PATCH");

  const getData = (text) => ({
    poll: "id-a",
    text,
    list: mockList()
  });

  const testVote = initTestVote(handler, getData);

  it("sends polls if user is authenticated", () => testVote(mockUser({ id: "id-b" })));

  it("sends polls if ip user exists", () => testVote(mockIPUser({ id: "id-b" })));

  it("sends polls and user if no ip user exists", () => testVote());

});

//view delete poll

describe("viewDeletePoll", () => {

  const { viewDeletePoll } = handlers;

  const handler = mockAPICall(viewDeletePoll, "DELETE");

  const getData = () => ({
    poll: "id-a",
    list: mockList()
  });

  const getPoll = () => mockPoll({
    id: "id-a",
    users: { created: "id-b" }
  });

  it("sends 401 if user is unauthenticated, restricted, or not the creator", async () => {

    const user = mockUser({ id: "id-c" });

    await pollsCol().insertOne(getPoll());

    return testAuthFail(handler, getData(), [user]);

  });

  it("sends polls if user is valid", async () => {

    const user = mockUser({ id: "id-b" });

    await pollsCol().insertOne(getPoll());

    expect(await handler(user, getData(), "json")).toEqual({ polls: [] });

  });

});

//view remove option

describe("viewRemoveOption", () => {

  const { viewRemoveOption } = handlers;

  const handler = mockAPICall(viewRemoveOption, "PATCH");

  const getData = (text) => ({
    poll: "id-a",
    text,
    list: mockList()
  });

  const getPoll = () => mockPoll({
    id: "id-a",
    users: { created: "id-b" },
    options: [{
      text: "Option A",
      created: "id-c"
    }]
  });

  const testRemove = async (id) => {

    const poll = getPoll();
    const user = mockUser({ id });

    await pollsCol().insertOne(poll);

    const output = await handler(user, getData("Option A"), "json");

    poll.options = [];

    expect(output).toEqual({ polls: [poll] });

  };

  it("sends 401 if user is unauthenticated, restricted, or not the creator", async () => {

    const user = mockUser({ id: "id-d" });
    const data = getData("Option A");

    await pollsCol().insertOne(getPoll());

    return testAuthFail(handler, data, [user]);

  });

  it("sends polls if user is valid (poll)", () => testRemove("id-b"));

  it("sends polls if user is valid (option)", () => testRemove("id-c"));

});

//view toggle private

describe("viewTogglePrivate", () => {

  const { viewTogglePrivate } = handlers;

  const handler = mockAPICall(viewTogglePrivate, "PATCH");

  const getData = () => ({
    poll: "id-a",
    list: mockList()
  });

  const getPoll = () => mockPoll({
    id: "id-a",
    users: { created: "id-b" }
  });

  const testToggle = async (user) => {

    const poll = await pollsCol().findOne();
    const bool = !poll.private;

    const output = await handler(user, getData(), "json");
    const update = await pollsCol().findOne();

    expect(output).toEqual({ polls: bool ? [] : [update] });
    expect(update.private).toEqual(bool);

  };

  it("sends 401 if user is unauthenticated, restricted, or not the creator", async () => {

    const user = mockUser({ id: "id-c" });

    await pollsCol().insertOne(getPoll());

    return testAuthFail(handler, getData(), [user]);

  });

  it("sends polls if user is valid", async () => {

    const user = mockUser({ id: "id-b" });

    await pollsCol().insertOne(getPoll());

    await testToggle(user);
    await testToggle(user);

  });

});

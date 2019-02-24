"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const handlers = require("../../../scripts/api/handlers/list-handlers");

const { mockList, mockPoll } = require("../../test-helpers");

//global imports

const { mockIPUser, mockUser } = require("test-helpers/mocks");
const { mockAPICall, mongoSetup, mongoTeardown } = require("test-helpers/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

//setup

beforeAll(mongoSetup);
afterAll(mongoTeardown);

afterEach(async () => {
  await pollsCol().deleteMany({});
});

//list set sort

describe("listSetSort", () => {

  const { listSetSort } = handlers;

  const handler = mockAPICall(listSetSort, "GET");

  const getData = (list) => ({ list: mockList(list) });

  it("sends polls sorted by date", async () => {

    const pollA = mockPoll();
    const pollB = mockPoll({ date: 1 });

    await pollsCol().insertMany([pollA, pollB]);

    const output = await handler({}, getData({ sort: "new" }), "json");

    expect(output).toEqual({ polls: [pollB, pollA] });

  });

  it("sends polls sorted by vote count", async () => {

    const pollA = mockPoll();
    const pollB = mockPoll({ users: { voted: 1 } });

    await pollsCol().insertMany([pollA, pollB]);

    const output = await handler({}, getData({ sort: "popular" }), "json");

    expect(output).toEqual({ polls: [pollB, pollA] });

  });

});

//list submit search

describe("listSubmitSearch", () => {

  const { listSubmitSearch } = handlers;

  const handler = mockAPICall(listSubmitSearch, "GET");

  const getData = (list) => ({ list: mockList(list) });

  it("sends errors if search is empty", async () => {

    const json = { errors: ["Search must not be empty"] };

    expect(await handler({}, getData(), "json")).toEqual(json);

  });

  it("sends polls if search is valid", async () => {

    const pollA = mockPoll({ title: "Apple" });
    const pollB = mockPoll({ author: "Apple" });
    const pollC = mockPoll({ options: [{ text: "Apple" }] });
    const pollD = mockPoll();

    await pollsCol().insertMany([pollA, pollB, pollC, pollD]);
    await pollsCol().createIndex({
      "title": "text",
      "author": "text",
      "options.text": "text"
    });

    const output = await handler({}, getData({ searched: "Apple" }), "json");

    for (const e of output.polls) {
      delete e.score;
    }

    expect(output).toEqual({ polls: [pollA, pollB, pollC] });

  });

});

//list toggle flag

describe("listToggleFlag", () => {

  const { listToggleFlag } = handlers;

  const handler = mockAPICall(listToggleFlag, "PATCH");

  const getData = (poll) => ({
    poll,
    list: mockList()
  });

  it("sends 401 if user is unauthenticated", async () => {
    expect(await handler({}, getData(), "sendStatus")).toEqual(401);
  });

  it("sends 401 if user is restricted", async () => {

    const user = mockUser({ data: { restricted: true } });

    expect(await handler(user, getData(), "sendStatus")).toEqual(401);

  });

  it("sends polls if user is valid", async () => {

    const poll = mockPoll({ id: "id-a" });
    const user = mockUser({ id: "id-b" });

    await pollsCol().insertOne(poll);

    const output = await handler(user, getData("id-a"), "json");
    const update = await pollsCol().findOne();

    expect(output).toEqual({ polls: [update] });
    expect(update.users.flagged).toEqual(["id-b"]);

  });

});

//list toggle hide

describe("listToggleHide", () => {

  const { listToggleHide } = handlers;

  const handler = mockAPICall(listToggleHide, "PATCH");

  const getData = (poll) => ({
    poll,
    list: mockList()
  });

  afterEach(async () => {
    await usersCol().deleteMany({});
  });

  it("sends polls if user is authenticated", async () => {

    const poll = mockPoll({ id: "id-a" });
    const user = mockUser({ id: "id-b" });

    await pollsCol().insertOne(poll);

    const output = await handler(user, getData("id-a"), "json");
    const update = await pollsCol().findOne();

    expect(output).toEqual({ polls: [] });
    expect(update.users.hidden).toEqual(["id-b"]);

  });

  it("sends polls if ip user exists", async () => {

    const poll = mockPoll({ id: "id-a" });
    const user = mockIPUser({ id: "id-b" });

    await Promise.all([
      pollsCol().insertOne(poll),
      usersCol().insertOne(user)
    ]);

    const output = await handler(user, getData("id-a"), "json");
    const update = await pollsCol().findOne();

    expect(output).toEqual({ polls: [] });
    expect(update.users.hidden).toEqual(["id-b"]);

  });

  it("sends polls and user if no ip user exists", async () => {

    const poll = mockPoll({ id: "id-a" });

    await pollsCol().insertOne(poll);

    const output = await handler({}, getData("id-a"), "json");
    const [update, user] = await Promise.all([
      pollsCol().findOne(),
      usersCol().findOne()
    ]);

    expect(output).toEqual({
      polls: [],
      user
    });
    expect(update.users.hidden).toEqual([user.id]);

  });

});

"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const handlers = require("../../../scripts/api/handlers/list-handlers");

const { mockList, mockPoll } = require("../../test-helpers");

//global imports

const { mockIPUser, mockUser } = require("test-helpers/mocks");
const { mockAPICall, mongoTests, testAuthFail } = require("test-helpers/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

const initTestToggle = (handler, data, prop) => async (user) => {

  const poll = mockPoll({ id: "id-a" });

  await pollsCol().insertOne(poll);

  const toggleBool = async (bool) => {

    const output = await handler(user || {}, data, "json");
    const update = await pollsCol().findOne();
    const actual = user || await usersCol().findOne();

    const show = prop === "flagged" || prop === "hidden" && !bool;

    const polls = show ? [update] : [];

    expect(output).toEqual(user || !bool ? { polls } : {
      polls,
      user: actual
    });

    expect(update.users[prop]).toEqual(bool ? [actual.id] : []);

  };

  await toggleBool(true);
  await toggleBool(false);

};

//setup

beforeAll(mongoTests.setup);
afterAll(mongoTests.teardown);

afterEach(mongoTests.reset(pollsCol, usersCol));

//list set sort

describe("listSetSort", () => {

  const { listSetSort } = handlers;

  const handler = mockAPICall(listSetSort, "GET");

  const getData = (sort) => ({ list: mockList({ sort }) });

  const testSort = async (pollData, sort) => {

    const polls = pollData.map(mockPoll);

    await pollsCol().insertMany(polls);

    const output = await handler({}, getData(sort), "json");

    expect(output).toEqual({ polls: polls.reverse() });

  };

  it("sends polls sorted by date", () => {

    const polls = [{}, { date: 1 }];

    return testSort(polls, "new");

  });

  it("sends polls sorted by vote count", () => {

    const polls = [{}, { users: { voted: 1 } }];

    return testSort(polls, "popular");

  });

});

//list submit search

describe("listSubmitSearch", () => {

  const { listSubmitSearch } = handlers;

  const handler = mockAPICall(listSubmitSearch, "GET");

  const getData = (searched) => ({ list: mockList({ searched }) });

  it("sends errors if search is empty", async () => {

    const json = { errors: ["Search must not be empty"] };

    expect(await handler({}, getData(""), "json")).toEqual(json);

  });

  it("sends polls if search is valid", async () => {

    const polls = [{ title: "Apple" }, { author: "Apple" }, { options: [{ text: "Apple" }] }].map(mockPoll);

    await pollsCol().insertMany(polls);
    await pollsCol().createIndex({
      "title": "text",
      "author": "text",
      "options.text": "text"
    });

    const output = await handler({}, getData("Apple"), "json");

    for (const e of output.polls) {
      delete e.score;
    }

    expect(output).toEqual({ polls: polls.slice(0, 3) });

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

  const testToggle = initTestToggle(handler, getData("id-a"), "flagged");

  it("sends 401 if user is unauthenticated or restricted", () => testAuthFail(handler, getData()));

  it("sends polls if user is valid", () => {

    const user = mockUser({ id: "id-b" });

    return testToggle(user);

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

  const testToggle = initTestToggle(handler, getData("id-a"), "hidden");

  it("sends polls if user is authenticated", () => {

    const user = mockUser({ id: "id-b" });

    return testToggle(user);

  });

  it("sends polls if ip user exists", async () => {

    const user = mockIPUser({ id: "id-b" });

    await usersCol().insertOne(user);

    return testToggle(user);

  });

  it("sends polls and user if no ip user exists", () => testToggle());

});

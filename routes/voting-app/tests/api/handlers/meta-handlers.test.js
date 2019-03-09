"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const handlers = require("../../../scripts/api/handlers/meta-handlers");

const { mockPoll } = require("../../test-helpers");

//global imports

const { mockData, mockIPUser, mockUser } = require("test-helpers/mocks");
const { mockAPICall, mongoTests, testAuthFail } = require("test-helpers/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

const mockList = mockData({
  filter: "all",
  search: "",
  searched: "",
  sort: "new",
  index: 0
});

//setup

beforeAll(mongoTests.setup);
afterAll(mongoTests.teardown);

afterEach(mongoTests.reset(pollsCol, usersCol));

//meta get polls

describe("metaGetPolls", () => {

  const { metaGetPolls } = handlers;

  const handler = mockAPICall(metaGetPolls, "GET");

  const getData = (poll, skip) => ({
    poll,
    skip,
    list: mockList()
  });

  const testGet = async (poll, skip = false) => {

    const polls = [{}, { id: "id-b" }].map(mockPoll);

    const index = Number(Boolean(poll) || skip);

    await pollsCol().insertMany(polls);

    const output = await handler({}, getData(poll, skip), "json");

    expect(output).toEqual({ polls: polls.slice(index) });

  };

  it("sends polls if skip is false", () => testGet());

  it("sends polls if skip is true", () => testGet(null, true));

  it("sends polls if poll is valid", () => testGet("id-b"));

});

describe("metaGetPolls (sort)", () => {

  const { metaGetPolls } = handlers;

  const handler = mockAPICall(metaGetPolls, "GET");

  const getData = (sort) => ({ list: mockList({ sort }) });

  const testSort = async (pollData, sort) => {

    const polls = pollData.map(mockPoll);

    await pollsCol().insertMany(polls);

    const output = await handler({}, getData(sort), "json");

    expect(output).toEqual({ polls: polls.reverse() });

  };

  it("sends polls if sort is new", () => {

    const polls = [{}, { date: 1 }];

    return testSort(polls, "new");

  });

  it("sends polls if sort is popular", () => {

    const polls = [{}, { users: { voted: 1 } }];

    return testSort(polls, "popular");

  });

});

describe("metaGetPolls (search)", () => {

  const { metaGetPolls } = handlers;

  const handler = mockAPICall(metaGetPolls, "GET");

  const getData = (searched) => ({ list: mockList({ searched }) });

  const testSearch = async (pollData, search, count) => {

    const polls = pollData.map(mockPoll);

    await pollsCol().insertMany(polls);

    const output = await handler({}, getData(search), "json");

    if (search) {
      output.polls.forEach((e, i) => {
        polls[i].score = e.score;
      });
    }

    expect(output).toEqual({ polls: polls.slice(0, count) });

  };

  it("sends polls if search is empty", () => testSearch([{}], "", 1));

  it("sends polls if search is valid", () => {

    const str = "Apple";

    const polls = [{ title: str }, { author: str }, { options: [{ text: str }] }, {}];

    return testSearch(polls, str, 3);

  });

});

describe("metaGetPolls (filter)", () => {

  const { metaGetPolls } = handlers;

  const handler = mockAPICall(metaGetPolls, "GET");

  const getData = (filter) => ({ list: mockList({ filter }) });

  const testFilter = async (pollData, types, filter, count) => {

    const userData = [mockUser, mockIPUser, {}].slice(0, types);

    const polls = pollData.map(mockPoll);
    const users = userData.map((e) => e({ id: "id-a" }));

    await Promise.all([
      pollsCol().insertMany(polls),
      usersCol().insertMany(users)
    ]);

    const output = await Promise.all(users.map((e) => handler(e, getData(filter), "json")));

    for (const e of output) {
      expect(e).toEqual({ polls: polls.slice(0, count) });
    }

  };

  it("sends polls if filter is all", () => {

    const polls = [{}, { private: true }, { users: { hidden: ["id-a"] } }];

    return testFilter(polls, 2, "all", 1);

  });

  it("sends 401 if filter is created and user is unauthenticated or restricted", () => {

    const data = getData("created");

    return testAuthFail(handler, data);

  });

  it("sends polls if filter is created and user is valid", () => {

    const polls = [{ users: { created: "id-a" } }, { options: [{ created: "id-a" }] }, {}];

    return testFilter(polls, 1, "created", 2);

  });

  it("sends polls if filter is voted", () => {

    const polls = [{ options: [{ voted: ["id-a"] }] }, {}];

    return testFilter(polls, 2, "voted", 1);

  });

  it("sends polls if filter is hidden", () => {

    const polls = [{ users: { hidden: ["id-a"] } }, {}];

    return testFilter(polls, 2, "hidden", 1);

  });

});

//meta get user

describe("metaGetUser", () => {

  const { metaGetUser } = handlers;

  const handler = mockAPICall(metaGetUser, "GET");

  const getData = () => {};

  const testGet = async (user) => {

    const output = await handler(user, getData(), "json");

    expect(output).toEqual({ user });

  };

  it("sends user if user is authenticated", () => testGet(mockUser()));

  it("sends user if ip user exists", async () => {

    const user = mockIPUser();

    await usersCol().insertOne(user);

    return testGet(user);

  });

  it("sends user if no ip user exists", () => testGet({}));

});

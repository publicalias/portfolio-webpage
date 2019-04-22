"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const handlers = require("../../../scripts/api/handlers/meta-handlers");

//global imports

const { newIPUser, newUser } = require("schemas/auth");
const { newPoll, newState } = require("schemas/voting-app");
const { mockAPICall, mongoTests, testAuthFail } = require("server-tests");
const { newSchema } = require("utilities");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

const mockList = newSchema(newState().list);

//setup

beforeAll(mongoTests.setup);
afterAll(mongoTests.teardown);

afterEach(mongoTests.reset(pollsCol, usersCol));

//meta get polls

describe("metaGetPolls", () => {

  const { metaGetPolls } = handlers;

  const handler = mockAPICall(metaGetPolls, "GET");

  const getData = (id, skip) => ({
    id,
    skip,
    list: mockList()
  });

  const testPolls = async (id, skip = false) => {

    const polls = [{}, { id: "id-b" }].map(newPoll);
    const index = Number(Boolean(id) || skip);

    await pollsCol().insertMany(polls);

    const output = await handler({}, getData(id, skip), "json");

    expect(output).toEqual({ polls: polls.slice(index) });

  };

  it("sends polls if skip is false", () => testPolls());

  it("sends polls if skip is true", () => testPolls(null, true));

  it("sends polls if poll is valid", () => testPolls("id-b"));

});

describe("metaGetPolls (sort)", () => {

  const { metaGetPolls } = handlers;

  const handler = mockAPICall(metaGetPolls, "GET");

  const getData = (sort) => ({ list: mockList({ sort }) });

  const testPolls = async (pollData, sort) => {

    const polls = pollData.map(newPoll);

    await pollsCol().insertMany(polls);

    const output = await handler({}, getData(sort), "json");

    expect(output).toEqual({ polls: polls.reverse() });

  };

  it("sends polls if sort is new", () => {

    const polls = [{}, { date: 1 }];

    return testPolls(polls, "new");

  });

  it("sends polls if sort is popular", () => {

    const polls = [{}, { users: { voted: 1 } }];

    return testPolls(polls, "popular");

  });

});

describe("metaGetPolls (search)", () => {

  const { metaGetPolls } = handlers;

  const handler = mockAPICall(metaGetPolls, "GET");

  const getData = (searched) => ({ list: mockList({ searched }) });

  const testPolls = async (pollData, search, count) => {

    const polls = pollData.map(newPoll);

    await pollsCol().insertMany(polls);

    const output = await handler({}, getData(search), "json");

    if (search) {
      output.polls.forEach((e, i) => {
        polls[i].score = e.score;
      });
    }

    expect(output).toEqual({ polls: polls.slice(0, count) });

  };

  it("sends polls if search is empty", () => testPolls([{}], "", 1));

  it("sends polls if search is valid", () => {

    const str = "Apple";

    const polls = [{ title: str }, { author: str }, { options: [{ text: str }] }, {}];

    return testPolls(polls, str, 3);

  });

});

describe("metaGetPolls (filter)", () => {

  const { metaGetPolls } = handlers;

  const handler = mockAPICall(metaGetPolls, "GET");

  const getData = (filter) => ({ list: mockList({ filter }) });

  const testPolls = async (pollData, filter, counts) => {

    const userData = [newUser, newIPUser, () => ({})].slice(0, counts.length);

    const polls = pollData.map(newPoll);
    const users = userData.map((e) => e({ id: "id-a" }));

    await Promise.all([
      pollsCol().insertMany(polls),
      usersCol().insertMany(users)
    ]);

    const output = await Promise.all(users.map((e) => handler(e, getData(filter), "json")));

    output.forEach((e, i) => {
      expect(e).toEqual({ polls: polls.slice(0, counts[i]) });
    });

  };

  it("sends polls if filter is all", () => {

    const polls = [{}, { users: { hidden: ["id-a"] } }, { private: true }];

    return testPolls(polls, "all", [1, 1, 2]);

  });

  it("sends 401 if filter is created and user is unauthenticated or restricted", () => {

    const data = getData("created");

    return testAuthFail(handler, data);

  });

  it("sends polls if filter is created and user is valid", () => {

    const polls = [{ users: { created: "id-a" } }, { options: [{ created: "id-a" }] }, {}];

    return testPolls(polls, "created", [2]);

  });

  it("sends polls if filter is voted", () => {

    const polls = [{ options: [{ voted: ["id-a"] }] }, {}];

    return testPolls(polls, "voted", [1, 1, 0]);

  });

  it("sends polls if filter is hidden", () => {

    const polls = [{ users: { hidden: ["id-a"] } }, {}];

    return testPolls(polls, "hidden", [1, 1, 0]);

  });

});

//meta get user

describe("metaGetUser", () => {

  const { metaGetUser } = handlers;

  const handler = mockAPICall(metaGetUser, "GET");

  const getData = () => {};

  const testUser = async (user) => {

    const output = await handler(user, getData(), "json");

    expect(output).toEqual({ user });

  };

  it("sends user if user is authenticated", () => testUser(newUser()));

  it("sends user if ip user exists", async () => {

    const user = newIPUser();

    await usersCol().insertOne(user);

    return testUser(user);

  });

  it("sends user if no ip user exists", () => testUser({}));

});

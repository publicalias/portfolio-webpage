"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const handlers = require("../../../scripts/api/handlers/menu-handlers");

const { mockList, mockPoll } = require("../../test-helpers");

//global imports

const { mockIPUser, mockUser } = require("test-helpers/mocks");
const { mockAPICall, mongoTests, testAuthFail } = require("test-helpers/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

//setup

beforeAll(mongoTests.setup);
afterAll(mongoTests.teardown);

afterEach(mongoTests.reset(pollsCol, usersCol));

//menu set filter

describe("menuSetFilter", () => {

  const { menuSetFilter } = handlers;

  const handler = mockAPICall(menuSetFilter, "GET");

  const getData = (filter) => ({ list: mockList({ filter }) });

  const testFilter = async (pollData, types, filter, count) => {

    const userData = [mockUser, mockIPUser].slice(0, types);

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

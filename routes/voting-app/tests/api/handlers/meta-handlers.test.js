"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const handlers = require("../../../scripts/api/handlers/meta-handlers");

const { mockList, mockPoll } = require("../../test-helpers");

//global imports

const { mockIPUser, mockUser } = require("test-helpers/mocks");
const { mockAPICall, mongoTests } = require("test-helpers/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

//setup

beforeAll(mongoTests.setup);
afterAll(mongoTests.teardown);

afterEach(mongoTests.reset(pollsCol, usersCol));

//meta get polls

describe("metaGetPolls", () => {

  const { metaGetPolls } = handlers;

  const handler = mockAPICall(metaGetPolls, "GET");

  const getData = (skip) => ({
    skip,
    list: mockList()
  });

  const testGetPolls = async (skip = false) => {

    const polls = [{}, {}].map(mockPoll);

    const index = Number(skip);

    await pollsCol().insertMany(polls);

    expect(await handler({}, getData(skip), "json")).toEqual({ polls: polls.slice(index) });

  };

  it("sends polls if skip is false", () => testGetPolls());

  it("sends polls if skip is true", () => testGetPolls(true));

});

//meta get user

describe("metaGetUser", () => {

  const { metaGetUser } = handlers;

  const handler = mockAPICall(metaGetUser, "GET");

  const getData = () => undefined;

  const testGetUser = async (user = {}) => {

    if (user.ip !== undefined) {
      await usersCol().insertOne(user);
    }

    expect(await handler(user, getData(), "json")).toEqual({ user });

  };

  it("sends user if user is authenticated", () => testGetUser(mockUser()));

  it("sends user if ip user exists", () => testGetUser(mockIPUser()));

  it("sends user if no ip user exists", () => testGetUser());

});

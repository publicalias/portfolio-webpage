"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const handlers = require("../../../scripts/api/handlers/list-handlers");

const { mockPoll } = require("../../test-helpers");

//global imports

const { mockIPUser, mockUser } = require("test-helpers/mocks");
const { mockAPICall, mongoTests, testAuthFail } = require("test-helpers/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

const initTestToggle = (handler, getData, prop) => async (user) => {

  const toggleProp = async (bool) => {

    const output = await handler(user || {}, getData(), "json");

    const [update, actual] = await Promise.all([
      pollsCol().findOne(),
      user || usersCol().findOne()
    ]);

    expect(output).toEqual({});
    expect(update.users[prop]).toEqual(bool ? [actual.id] : []);

  };

  await Promise.all([
    pollsCol().insertOne(mockPoll({ id: "id-a" })),
    user && "ip" in user && usersCol().insertOne(user)
  ]);

  await toggleProp(true);
  await toggleProp(false);

};

//setup

beforeAll(mongoTests.setup);
afterAll(mongoTests.teardown);

afterEach(mongoTests.reset(pollsCol, usersCol));

//list toggle flag

describe("listToggleFlag", () => {

  const { listToggleFlag } = handlers;

  const handler = mockAPICall(listToggleFlag, "PATCH");

  const getData = () => ({ poll: "id-a" });

  const testToggle = initTestToggle(handler, getData, "flagged");

  it("sends 401 if user is unauthenticated or restricted", () => testAuthFail(handler, getData()));

  it("sends object if user is valid", () => testToggle(mockUser({ id: "id-b" })));

});

//list toggle hide

describe("listToggleHide", () => {

  const { listToggleHide } = handlers;

  const handler = mockAPICall(listToggleHide, "PATCH");

  const getData = () => ({ poll: "id-a" });

  const testToggle = initTestToggle(handler, getData, "hidden");

  it("sends object if user is authenticated", () => testToggle(mockUser({ id: "id-b" })));

  it("sends object if ip user exists", () => testToggle(mockIPUser({ id: "id-b" })));

  it("sends object if no ip user exists", () => testToggle());

});

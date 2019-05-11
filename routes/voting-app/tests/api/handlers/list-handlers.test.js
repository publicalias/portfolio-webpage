"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const handlers = require("../../../scripts/api/handlers/list-handlers");

//global imports

const { newIPUser, newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail } = require("test-helpers/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

const initTestToggle = (handler, getData, prop) => async (user) => {

  const toggleProp = async (bool) => {

    const res = await handler(user || {}, getData());

    const [update, actual] = await Promise.all([
      pollsCol().findOne(),
      user || usersCol().findOne()
    ]);

    testMock(res.json, [{}]);

    expect(update.users[prop]).toEqual(bool ? [actual.id] : []);

  };

  await Promise.all([
    pollsCol().insertOne(newPoll({ id: "id-a" })),
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

  const mockAPICall = initMockAPICall(listToggleFlag, "PATCH");

  const getData = () => ({ id: "id-a" });

  const testToggle = initTestToggle(mockAPICall, getData, "flagged");

  it("sends 401 if user is unauthenticated or restricted", () => testAuthFail(mockAPICall, getData()));

  it("sends object if user is valid", () => testToggle(newUser({ id: "id-b" })));

});

//list toggle hide

describe("listToggleHide", () => {

  const { listToggleHide } = handlers;

  const mockAPICall = initMockAPICall(listToggleHide, "PATCH");

  const getData = () => ({ id: "id-a" });

  const testToggle = initTestToggle(mockAPICall, getData, "hidden");

  it("sends object if user is authenticated", () => testToggle(newUser({ id: "id-b" })));

  it("sends object if ip user exists", () => testToggle(newIPUser({ id: "id-b" })));

  it("sends object if no ip user exists", () => testToggle());

});

"use strict";

/*eslint max-nested-callbacks: 0*/

//local imports

const handlers = require("../../../scripts/api/handlers/view-handlers");

//global imports

const { newIPUser, newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { mockAPICall, mongoTests, testAuthFail } = require("test-helpers/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

const initTestVote = (handler, getData) => async (user) => {

  const options = [{ text: "Option A" }, { text: "Option B" }];

  const castVote = async (index) => {

    const output = await handler(user || {}, getData(options[index].text), "json");

    const [update, actual] = await Promise.all([
      pollsCol().findOne(),
      user || usersCol().findOne()
    ]);

    const checkVote = (val) => {
      expect(update.options[val].voted).toEqual(index === val ? [actual.id] : []);
    };

    expect(output).toEqual({});

    checkVote(0);
    checkVote(1);

  };

  await Promise.all([
    pollsCol().insertOne(newPoll({
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
    id: "id-a",
    text
  });

  const testError = async (error, text, data) => {

    const poll = newPoll(Object.assign({ id: "id-a" }, data));

    await pollsCol().insertOne(poll);

    const output = await handler(newUser(), getData(text), "json");

    expect(output).toEqual({ errors: [error] });

  };

  it("sends 401 if user is unauthenticated or restricted", () => testAuthFail(handler, getData()));

  it("sends errors if option is empty", () => testError("Option must not be empty", ""));

  it("sends errors if option is duplicate", () => {

    const data = { options: [{ text: "Option A" }] };

    return testError("Option must be unique", "Option A", data);

  });

  it("sends errors if option is obscene", () => testError("Option must not be obscene", "Fuck"));

  it("sends object if option is valid", async () => {

    const poll = newPoll({ id: "id-a" });
    const user = newUser({ id: "id-b" });

    await pollsCol().insertOne(poll);

    const output = await handler(user, getData("Option A"), "json");
    const update = await pollsCol().findOne();

    expect(output).toEqual({});
    expect(update).toEqual(Object.assign(poll, {
      options: [{
        text: "Option A",
        created: "id-b",
        voted: []
      }]
    }));

  });

});

//view cast vote

describe("viewCastVote", () => {

  const { viewCastVote } = handlers;

  const handler = mockAPICall(viewCastVote, "PATCH");

  const getData = (text) => ({
    id: "id-a",
    text
  });

  const testVote = initTestVote(handler, getData);

  it("sends object if user is authenticated", () => testVote(newUser({ id: "id-b" })));

  it("sends object if ip user exists", () => testVote(newIPUser({ id: "id-b" })));

  it("sends object if no ip user exists", () => testVote());

});

//view delete poll

describe("viewDeletePoll", () => {

  const { viewDeletePoll } = handlers;

  const handler = mockAPICall(viewDeletePoll, "DELETE");

  const getData = () => ({ id: "id-a" });

  const getPoll = () => newPoll({
    id: "id-a",
    users: { created: "id-b" }
  });

  it("sends 401 if user is unauthenticated, restricted, or not the creator", async () => {

    const user = newUser({ id: "id-c" });

    await pollsCol().insertOne(getPoll());

    await testAuthFail(handler, getData(), [user]);

    expect(await pollsCol().countDocuments()).toEqual(1);

  });

  it("sends object if user is valid", async () => {

    const user = newUser({ id: "id-b" });

    await pollsCol().insertOne(getPoll());

    const output = await handler(user, getData(), "json");

    expect(output).toEqual({});

    expect(await pollsCol().countDocuments()).toEqual(0);

  });

});

//view remove option

describe("viewRemoveOption", () => {

  const { viewRemoveOption } = handlers;

  const handler = mockAPICall(viewRemoveOption, "PATCH");

  const getData = (text) => ({
    id: "id-a",
    text
  });

  const getPoll = () => newPoll({
    id: "id-a",
    users: { created: "id-b" },
    options: [{
      text: "Option A",
      created: "id-c"
    }]
  });

  const testRemove = async (id) => {

    const poll = getPoll();
    const user = newUser({ id });

    await pollsCol().insertOne(poll);

    const output = await handler(user, getData("Option A"), "json");
    const update = await pollsCol().findOne();

    expect(output).toEqual({});
    expect(update).toEqual(Object.assign(poll, { options: [] }));

  };

  it("sends 401 if user is unauthenticated, restricted, or not the creator", async () => {

    const user = newUser({ id: "id-d" });
    const data = getData("Option A");

    await pollsCol().insertOne(getPoll());

    return testAuthFail(handler, data, [user]);

  });

  it("sends object if user is valid (poll)", () => testRemove("id-b"));

  it("sends object if user is valid (option)", () => testRemove("id-c"));

});

//view toggle private

describe("viewTogglePrivate", () => {

  const { viewTogglePrivate } = handlers;

  const handler = mockAPICall(viewTogglePrivate, "PATCH");

  const getData = () => ({ id: "id-a" });

  const getPoll = () => newPoll({
    id: "id-a",
    users: { created: "id-b" }
  });

  const testToggle = async (user) => {

    const { private: bool } = await pollsCol().findOne();

    const output = await handler(user, getData(), "json");
    const update = await pollsCol().findOne();

    expect(output).toEqual({});
    expect(update.private).toEqual(!bool);

  };

  it("sends 401 if user is unauthenticated, restricted, or not the creator", async () => {

    const user = newUser({ id: "id-c" });

    await pollsCol().insertOne(getPoll());

    return testAuthFail(handler, getData(), [user]);

  });

  it("sends object if user is valid", async () => {

    const user = newUser({ id: "id-b" });

    await pollsCol().insertOne(getPoll());

    await testToggle(user);
    await testToggle(user);

  });

});

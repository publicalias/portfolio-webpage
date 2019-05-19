"use strict";

/*eslint max-nested-callbacks: 0, max-statements: 0*/

//local imports

const handlers = require("../../../scripts/api/handlers/meta-handlers");

const { overlyLongInput } = require("../../test-helpers");

//global imports

const { initSchema, newIPUser, newUser } = require("schemas/master");
const { newListParams, newPoll, newState } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail } = require("test-helpers/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

//setup

beforeAll(mongoTests.setup);
afterAll(mongoTests.teardown);

afterEach(mongoTests.reset(pollsCol, usersCol));

//meta create poll

describe("metaCreatePoll", () => {

  const { metaCreatePoll } = handlers;

  const mockAPICall = initMockAPICall(metaCreatePoll, "POST");

  const mockForm = initSchema(newState().form);

  const getData = (form) => mockForm(form);

  const testError = async (error, data, docs = 0) => {

    const res = await mockAPICall(newUser(), getData(data));

    expect(res.json.mock.calls[0][0].errors.includes(error)).toEqual(true);

    expect(await pollsCol().countDocuments()).toEqual(docs);

  };

  it("sends 401 if user is unauthenticated or restricted", async () => {

    await testAuthFail(mockAPICall, getData());

    expect(await pollsCol().countDocuments()).toEqual(0);

  });

  it("sends errors if title is empty", () => testError("Title must not be empty"));

  it("sends errors if title is too long", () => testError("Title must not exceed character limit", { title: overlyLongInput }));

  it("sends errors if title is duplicate", async () => {

    const data = { title: "Title A" };

    await pollsCol().insertOne(newPoll(data));

    return testError("Title must be unique", data, 1);

  });

  it("sends errors if title is obscene", () => testError("Title must not be obscene", { title: "Fuck" }));

  it("sends errors if option is empty", () => testError("Option must not be empty", { options: [""] }));

  it("sends errors if option is too long", () => testError("Option must not exceed character limit", { options: [overlyLongInput] }));

  it("sends errors if option is duplicate", () => testError("Option must be unique", { options: ["Option A", "Option A"] }));

  it("sends errors if option is obscene", () => testError("Option must not be obscene", { options: ["Fuck"] }));

  it("sends object if poll is valid", async () => {

    const res = await mockAPICall(newUser(), getData({
      title: "Title A",
      options: ["Option A"]
    }));

    testMock(res.json, [{}]);

    expect(await pollsCol().countDocuments()).toEqual(1);

  });

});

//meta delete poll

describe("metaDeletePoll", () => {

  const { metaDeletePoll } = handlers;

  const mockAPICall = initMockAPICall(metaDeletePoll, "DELETE");

  const getData = () => ({ id: "id-a" });

  const getPoll = () => newPoll({
    id: "id-a",
    users: { created: "id-b" }
  });

  it("sends 401 if user is unauthenticated, restricted, or not the creator", async () => {

    const user = newUser({ id: "id-c" });

    await pollsCol().insertOne(getPoll());

    await testAuthFail(mockAPICall, getData(), [user]);

    expect(await pollsCol().countDocuments()).toEqual(1);

  });

  it("sends object if user is valid", async () => {

    const user = newUser({ id: "id-b" });

    await pollsCol().insertOne(getPoll());

    const res = await mockAPICall(user, getData());

    testMock(res.json, [{}]);

    expect(await pollsCol().countDocuments()).toEqual(0);

  });

});

//meta get polls

describe("metaGetPolls", () => {

  const { metaGetPolls } = handlers;

  const mockAPICall = initMockAPICall(metaGetPolls, "GET");

  const getData = (id, length) => ({
    params: newListParams(),
    id,
    length
  });

  const testPolls = async (pollData, id, length = 0) => {

    const polls = pollData.map(newPoll);
    const index = id ? 1 : 0;

    await pollsCol().insertMany(polls);

    const res = await mockAPICall({}, getData(id, length));

    testMock(res.json, [{ polls: polls.slice(index) }]);

  };

  it("sends polls if length is 0", () => testPolls([{}]));

  it("sends polls if length is 1", () => testPolls(Array(100 + 1).fill({}), null, 1));

  it("sends polls if id is valid", () => testPolls([{}, { id: "id-b" }], "id-b"));

});

describe("metaGetPolls (sort)", () => {

  const { metaGetPolls } = handlers;

  const mockAPICall = initMockAPICall(metaGetPolls, "GET");

  const getData = (sort) => ({ params: newListParams({ sort }) });

  const testPolls = async (pollData, sort) => {

    const polls = pollData.map(newPoll);

    await pollsCol().insertMany(polls);

    const res = await mockAPICall({}, getData(sort));

    testMock(res.json, [{ polls: polls.reverse() }]);

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

  const mockAPICall = initMockAPICall(metaGetPolls, "GET");

  const getData = (search) => ({ params: newListParams({ search }) });

  const testPolls = async (pollData, search, count) => {

    const polls = pollData.map(newPoll);

    await pollsCol().insertMany(polls);

    const res = await mockAPICall({}, getData(search));

    if (search) {
      for (const e of res.json.mock.calls[0][0].polls) {
        delete e.score;
      }
    }

    testMock(res.json, [{ polls: polls.slice(0, count) }]);

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

  const mockAPICall = initMockAPICall(metaGetPolls, "GET");

  const getData = (filter) => ({ params: newListParams({ filter }) });

  const testPolls = async (pollData, filter, counts) => {

    const userData = [newUser, newIPUser, () => ({})].slice(0, counts.length);

    const polls = pollData.map(newPoll);
    const users = userData.map((e) => e({ id: "id-a" }));

    await Promise.all([
      pollsCol().insertMany(polls),
      usersCol().insertMany(users)
    ]);

    const res = await Promise.all(users.map((e) => mockAPICall(e, getData(filter))));

    res.forEach((e, i) => {
      testMock(e.json, [{ polls: polls.slice(0, counts[i]) }]);
    });

  };

  it("sends polls if filter is all", () => {

    const polls = [{}, { users: { hidden: ["id-a"] } }, { secret: true }];

    return testPolls(polls, "all", [1, 1, 2]);

  });

  it("sends 401 if filter is created and user is unauthenticated or restricted", () => {

    const data = getData("created");

    return testAuthFail(mockAPICall, data);

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

  const mockAPICall = initMockAPICall(metaGetUser, "GET");

  const getData = () => {};

  const testUser = async (user) => {

    const res = await mockAPICall(user, getData());

    testMock(res.json, [{ user }]);

  };

  it("sends user if user is authenticated", () => testUser(newUser()));

  it("sends user if ip user exists", async () => {

    const user = newIPUser();

    await usersCol().insertOne(user);

    return testUser(user);

  });

  it("sends user if no ip user exists", () => testUser({}));

});

"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/meta-handlers");

const { newForm, newListParams, newPoll } = require("../../../../schemas");
const { overlyLongInput, testOptions, testTitle } = require("../../test-helpers");

//global imports

const { newIPUser, newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail } = require("redux/tests/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

//setup

beforeAll(mongoTests.setup);
beforeEach(mongoTests.reset(pollsCol, usersCol));
afterAll(mongoTests.teardown);

//meta create poll

describe("metaCreatePoll", () => {

  const { metaCreatePoll } = handlers;

  const mockAPICall = initMockAPICall(metaCreatePoll, "POST");

  const getData = (form) => newForm(form);

  const testError = async (error, form, docs = 0) => {

    const res = await mockAPICall(newUser(), getData(form));

    const args = res.json.mock.calls[0];

    expect(args[0].errors.includes(error)).toEqual(true);

    expect(await pollsCol().countDocuments()).toEqual(docs);

  };

  testOptions((error, data, other) => testError(error, { options: [data, ...other || []] }));

  testTitle((error, data, docs) => testError(error, { title: data }, docs), [null, null, [1]]);

  it("sends 401 if user is unauthenticated or restricted", async () => {

    await testAuthFail(mockAPICall, getData());

    expect(await pollsCol().countDocuments()).toEqual(0);

  });

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

//meta get poll item

describe("metaGetPollItem", () => {

  const { metaGetPollItem } = handlers;

  const mockAPICall = initMockAPICall(metaGetPollItem, "GET");

  const getData = (id) => ({ id });

  const testPolls = async (pollData, id) => {

    const polls = pollData.map(newPoll);

    await pollsCol().insertMany(polls);

    const res = await mockAPICall({}, getData(id));

    testMock(res.json, [{ polls: polls.filter((e) => e.id === id) }]);

  };

  it("sends polls if id exists", () => testPolls([{ id: "id-a" }, {}], "id-a"));

  it("sends polls if id does not exist", () => testPolls([{}], "id-a"));

});

//meta get poll list

describe("metaGetPollList", () => {

  const { metaGetPollList } = handlers;

  const mockAPICall = initMockAPICall(metaGetPollList, "GET");

  const getData = (length) => ({
    params: newListParams(),
    length
  });

  const testPolls = async (pollData, length = 0) => {

    const polls = pollData.map(newPoll);

    await pollsCol().insertMany(polls);

    const res = await mockAPICall({}, getData(length));

    testMock(res.json, [{ polls }]);

  };

  it("sends polls if length is 0", () => testPolls([{}]));

  it("sends polls if length is 1", () => testPolls(Array(1 + 100).fill({}), 1));

});

describe("metaGetPollList (sort)", () => {

  const { metaGetPollList } = handlers;

  const mockAPICall = initMockAPICall(metaGetPollList, "GET");

  const getData = (sort) => ({ params: newListParams({ sort }) });

  const testPolls = async (pollData, sort) => {

    const polls = pollData.map(newPoll);

    await pollsCol().insertMany(polls);

    const res = await mockAPICall({}, getData(sort));

    testMock(res.json, [{ polls: polls.reverse() }]);

  };

  it("sends polls if sort is new", () => {

    const polls = [{}, { date: Date.now() }];

    return testPolls(polls, "new");

  });

  it("sends polls if sort is popular", () => {

    const polls = [{}, {
      votes: 1,
      options: [{ voted: ["id-a"] }]
    }];

    return testPolls(polls, "popular");

  });

});

describe("metaGetPollList (search)", () => {

  const { metaGetPollList } = handlers;

  const mockAPICall = initMockAPICall(metaGetPollList, "GET");

  const getData = (search) => ({ params: newListParams({ search }) });

  const testPolls = async (pollData, search, count) => {

    const polls = pollData.map(newPoll);

    await pollsCol().insertMany(polls);

    const res = await mockAPICall({}, getData(search));

    testMock(res.json, [{ polls: polls.slice(0, count).reverse() }]);

  };

  it("sends errors if search exceeds character limit", async () => {

    const res = await mockAPICall({}, getData(overlyLongInput));

    testMock(res.json, [{ errors: ["Search exceeds character limit"] }]);

  });

  it("sends polls if search is valid (empty)", () => testPolls([{}], "", 1));

  it("sends polls if search is valid (non-empty)", () => {

    const text = "Apple";

    const polls = [
      { title: text },
      { author: `${text} ${text}` },
      { options: [{ text: `${text} ${text} ${text}` }] },
      {}
    ];

    return testPolls(polls, text, 3);

  });

});

describe("metaGetPollList (filter)", () => {

  const { metaGetPollList } = handlers;

  const mockAPICall = initMockAPICall(metaGetPollList, "GET");

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

    const polls = [{}, { users: { hidden: ["id-a"] } }, { secret: true }, { users: { flagged: Array(5).fill("") } }];

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

    const polls = [{
      votes: 1,
      options: [{ voted: ["id-a"] }]
    }, {}];

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

  const testUser = async (user) => {

    const res = await mockAPICall(user);

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

"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/meta-handlers");

const { newForm, newListParams, newPoll } = require("../../../../schemas");
const { overlyLongInput, testOptions, testTitle } = require("../../test-helpers");

//global imports

const { newIPUser, newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail, testInsert } = require("redux/tests/server-tests");

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

  const testError = async (error, form, count = 0) => {

    const res = await mockAPICall(newUser(), getData(form));

    const args = res.json.mock.calls[0];

    expect(args[0].errors.includes(error)).toEqual(true);

    expect(await pollsCol().countDocuments()).toEqual(count);

  };

  testOptions((error, data, other) => testError(error, { options: [data, ...other || []] }));

  testTitle((error, data, count) => testError(error, { title: data }, count), [null, null, [1]]);

  it("sends 401 if authentication fails", async () => {

    await testAuthFail(mockAPICall, getData());

    expect(await pollsCol().countDocuments()).toEqual(0);

  });

  it("sends noop if successful", async () => {

    const res = await mockAPICall(
      newUser({
        name: "User A",
        id: "id-a"
      }),
      getData({
        title: "Title A",
        options: ["Option A"],
        secret: true
      })
    );

    testMock(res.json, [{}]);

    await testInsert(pollsCol);

  });

});

//meta delete poll

describe("metaDeletePoll", () => {

  const { metaDeletePoll } = handlers;

  const mockAPICall = initMockAPICall(metaDeletePoll, "DELETE");

  const getData = () => ({ id: "id-a" });

  beforeEach(() => pollsCol().insertOne(newPoll({
    id: "id-a",
    users: { created: "id-b" }
  })));

  it("sends 401 if authentication fails", async () => {

    await testAuthFail(mockAPICall, getData(), [newUser({ id: "id-c" })]);

    expect(await pollsCol().countDocuments()).toEqual(1);

  });

  it("sends noop if successful", async () => {

    const res = await mockAPICall(newUser({ id: "id-b" }), getData());

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

  it("sends data if successful (id exists)", () => testPolls([{ id: "id-a" }, {}], "id-a"));

  it("sends data if successful (id does not exist)", () => testPolls([{}], "id-a"));

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

  it("sends data if successful (length, 0)", () => testPolls([{}]));

  it("sends data if successful (length, 1)", () => testPolls(Array(1 + 100).fill({}), 1));

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

  it("sends data if successful (sort, new)", () => testPolls([{}, { date: Date.now() }], "new"));

  it("sends data if successful (sort, popular)", () => {

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

  it("sends data if successful (search, empty)", () => testPolls([{}], "", 1));

  it("sends data if successful (search, non-empty)", () => {

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

  it("sends data if successful (filter, all)", () => {

    const polls = [{}, { users: { hidden: ["id-a"] } }, { secret: true }, { users: { flagged: Array(5).fill("") } }];

    return testPolls(polls, "all", [1, 1, 2]);

  });

  it("sends 401 if authentication fails (filter, created)", () => {

    const args = [mockAPICall, getData("created")];

    return testAuthFail(...args);

  });

  it("sends data if successful (filter, created)", () => {

    const polls = [{ users: { created: "id-a" } }, { options: [{ created: "id-a" }] }, {}];

    return testPolls(polls, "created", [2]);

  });

  it("sends data if successful (filter, voted)", () => {

    const polls = [{
      votes: 1,
      options: [{ voted: ["id-a"] }]
    }, {}];

    return testPolls(polls, "voted", [1, 1, 0]);

  });

  it("sends data if successful (filter, hidden)", () => {

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

  it("sends data if successful (user is authenticated)", () => testUser(newUser()));

  it("sends data if successful (ip user exists)", async () => {

    const user = newIPUser();

    await usersCol().insertOne(user);

    await testUser(user);

  });

  it("sends data if successful (no ip user exists)", () => testUser({}));

});

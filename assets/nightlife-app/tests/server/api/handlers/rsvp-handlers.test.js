"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/rsvp-handlers");

const { newFriend, newRSVP } = require("../../../../schemas");

//global imports

const { newUser } = require("redux/schemas");
const { initTestErrors, overlyLongInput, testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail, testInsert } = require("redux/tests/server-tests");

//utilities

const friendsCol = () => db.collection("nightlife-app/friends");
const rsvpsCol = () => db.collection("nightlife-app/rsvps");

//setup

beforeAll(mongoTests.setup);
beforeEach(mongoTests.reset(friendsCol, rsvpsCol));
afterAll(mongoTests.teardown);

//rsvp add

describe("rsvpAdd", () => {

  const { rsvpAdd } = handlers;

  const mockAPICall = initMockAPICall(rsvpAdd, "POST");

  const getData = (time = "9:00 PM", message = "Message") => ({
    name: "Venue A",
    id: "id-a",
    time,
    message
  });

  const testInputs = initTestErrors([
    ["sends errors if time exceeds character limit", ["Time exceeds character limit", overlyLongInput()]],
    ["sends errors if message exceeds character limit", ["Message exceeds character limit", "9:00 PM", overlyLongInput()]],
    ["sends errors if time is incorrectly formatted", ["Time is incorrectly formatted", "lol idk"]]
  ]);

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData()));

  it("sends errors if venue does not exist", async () => {

    const res = await mockAPICall(newUser(), Object.assign(getData(), { id: "" }));

    testMock(res.json, [{ errors: ["Venue does not exist"] }]);

  });

  it("sends errors if RSVP already exists", async () => {

    await rsvpsCol().insertOne(newRSVP({
      user: { id: "id-b" },
      venue: { id: "id-a" },
      time: "9:00 PM"
    }));

    const res = await mockAPICall(newUser({ id: "id-b" }), getData());

    testMock(res.json, [{ errors: ["RSVP already exists"] }]);

  });

  testInputs(async (error, time, message) => {

    const res = await mockAPICall(newUser(), getData(time, message));

    const [{ errors }] = res.json.mock.calls[0];

    expect(errors.includes(error)).toEqual(true);

  });

  it("sends noop if successful", async () => {

    const res = await mockAPICall(
      newUser({
        name: "User B",
        id: "id-b"
      }),
      getData()
    );

    testMock(res.json, [{}]);

    await testInsert(rsvpsCol);

  });

});

//rsvp dismiss

describe("rsvpDismiss", () => {

  const { rsvpDismiss } = handlers;

  const mockAPICall = initMockAPICall(rsvpDismiss, "PATCH");

  const getData = () => ({ id: "id-a" });

  beforeEach(() => Promise.all([
    friendsCol().insertMany([
      newFriend({
        from: { id: "id-b" },
        to: { id: "id-c" }
      }),
      newFriend({
        from: { id: "id-d" },
        to: { id: "id-b" }
      })
    ]),
    rsvpsCol().insertOne(newRSVP({
      id: "id-a",
      user: { id: "id-b" }
    }))
  ]));

  const testDismiss = async (id) => {

    await friendsCol().updateMany({}, { $set: { confirmed: true } });

    const res = await mockAPICall(newUser({ id }), getData());

    const update = await rsvpsCol().findOne();

    expect(update.hidden).toEqual([id]);

    testMock(res.json, [{}]);

  };

  it("sends status if authentication fails", () => testAuthFail(
    mockAPICall,
    getData(),
    [newUser(), newUser({ id: "id-c" }), newUser({ id: "id-d" })]
  ));

  it("sends noop if successful (from)", () => testDismiss("id-d"));

  it("sends noop if successful (to)", () => testDismiss("id-c"));

  it("sends noop if successful (self)", () => testDismiss("id-b"));

});

//rsvp get list

describe("rsvpGetList", () => {

  const { rsvpGetList } = handlers;

  const mockAPICall = initMockAPICall(rsvpGetList, "GET");

  it("sends status if authentication fails", () => testAuthFail(mockAPICall));

  it("sends data if successful", async () => {

    const friends = [
      newFriend({
        from: { id: "id-a" },
        to: { id: "id-b" },
        confirmed: true
      }),
      newFriend({
        from: { id: "id-c" },
        to: { id: "id-a" },
        confirmed: true
      }),
      newFriend({
        from: { id: "id-a" },
        to: { id: "id-d" }
      })
    ];

    const rsvps = [
      newRSVP({ user: { id: "id-a" } }),
      newRSVP({
        date: 1,
        user: { id: "id-b" }
      }),
      newRSVP({
        date: 2,
        user: { id: "id-c" }
      }),
      newRSVP({
        user: { id: "id-b" },
        hidden: ["id-a"]
      }),
      newRSVP({ user: { id: "id-d" } }),
      newRSVP({ user: { id: "id-e" } })
    ];

    await Promise.all([
      friendsCol().insertMany(friends),
      rsvpsCol().insertMany(rsvps)
    ]);

    const res = await mockAPICall(newUser({ id: "id-a" }));

    testMock(res.json, [{ notifications: { rsvps: rsvps.slice(0, 3).reverse() } }]);

  });

});

//rsvp remove

describe("rsvpRemove", () => {

  const { rsvpRemove } = handlers;

  const mockAPICall = initMockAPICall(rsvpRemove, "DELETE");

  const getData = () => ({ id: "id-a" });

  beforeEach(() => rsvpsCol().insertOne(newRSVP({
    id: "id-a",
    user: { id: "id-b" }
  })));

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData(), [newUser()]));

  it("sends noop if successful", async () => {

    const res = await mockAPICall(newUser({ id: "id-b" }), getData());

    testMock(res.json, [{}]);

    expect(await rsvpsCol().countDocuments()).toEqual(0);

  });

});

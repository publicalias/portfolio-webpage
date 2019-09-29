"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/rsvp-handlers");

const { newFriend, newRSVP } = require("../../../../schemas");

//global imports

const { newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail, testInsert } = require("redux/tests/server-tests");

//utilities

const friendsCol = () => db.collection("nightlife-app/friends");
const rsvpCol = () => db.collection("nightlife-app/rsvps");

//setup

beforeAll(mongoTests.setup);
beforeEach(mongoTests.reset(friendsCol, rsvpCol));
afterAll(mongoTests.teardown);

//rsvp add

describe("rsvpAdd", () => {

  const { rsvpAdd } = handlers;

  const mockAPICall = initMockAPICall(rsvpAdd, "POST");

  const getData = (time = "9:00 PM") => ({
    name: "Venue A",
    id: "id-a",
    time,
    message: "Message"
  });

  it("sends status if authentication fails", async () => {

    await testAuthFail(mockAPICall, getData());

    expect(await rsvpCol().countDocuments()).toEqual(0);

  });

  it("sends errors if RSVP already exists", async () => {

    await rsvpCol().insertOne(newRSVP({
      user: { id: "id-b" },
      venue: { id: "id-a" }
    }));

    const res = await mockAPICall(newUser({ id: "id-b" }), getData());

    testMock(res.json, [{ errors: ["RSVP already exists"] }]);

    expect(await rsvpCol().countDocuments()).toEqual(1);

  });

  it("sends errors if time is incorrectly formatted", async () => {

    const res = await mockAPICall(newUser(), getData("idk lol"));

    testMock(res.json, [{ errors: ["Time is incorrectly formatted"] }]);

    expect(await rsvpCol().countDocuments()).toEqual(0);

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

    await testInsert(rsvpCol);

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
    rsvpCol().insertOne(newRSVP({
      id: "id-a",
      user: { id: "id-b" }
    }))
  ]));

  const testDismiss = async (id) => {

    await friendsCol().updateMany({}, { $set: { confirmed: true } });

    const res = await mockAPICall(newUser({ id }), getData());

    const update = await rsvpCol().findOne();

    expect(update.hidden).toEqual([id]);

    testMock(res.json, [{}]);

  };

  it("sends status if authentication fails", async () => {

    const args = [mockAPICall, getData(), [newUser(), newUser({ id: "id-c" }), newUser({ id: "id-d" })]];

    await testAuthFail(...args);

  });

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
      rsvpCol().insertMany(rsvps)
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

  beforeEach(() => rsvpCol().insertOne(newRSVP({
    id: "id-a",
    user: { id: "id-b" }
  })));

  it("sends status if authentication fails", async () => {

    await testAuthFail(mockAPICall, getData(), [newUser()]);

    expect(await rsvpCol().countDocuments()).toEqual(1);

  });

  it("sends noop if successful", async () => {

    const res = await mockAPICall(newUser({ id: "id-b" }), getData());

    testMock(res.json, [{}]);

    expect(await rsvpCol().countDocuments()).toEqual(0);

  });

});

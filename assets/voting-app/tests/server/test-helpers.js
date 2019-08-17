"use strict";

//local imports

const { newPoll } = require("../../schemas");

//global imports

const { testErrors, testMock } = require("test-helpers/meta-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

//init test toggle

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

//init test unvote

const initTestUnvote = (handler, getData) => async (user) => {

  await Promise.all([
    pollsCol().insertOne(newPoll({
      id: "id-a",
      options: [{ voted: ["id-b"] }]
    })),
    user && "ip" in user && usersCol().insertOne(user)
  ]);

  const res = await handler(user || {}, getData());

  const update = await pollsCol().findOne();

  expect(update.options[0].voted).toEqual(user ? [] : ["id-b"]);

  testMock(res.json, [{}]);

};

//init test vote

const initTestVote = (handler, getData) => async (user) => {

  const options = [{ text: "Option A" }, { text: "Option B" }];

  const castVote = async (index) => {

    const res = await handler(user || {}, getData(options[index].text));

    const [update, actual] = await Promise.all([
      pollsCol().findOne(),
      user || usersCol().findOne()
    ]);

    const checkVote = (val) => {
      expect(update.options[val].voted).toEqual(index === val ? [actual.id] : []);
    };

    testMock(res.json, [{}]);

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

//overly long input

const overlyLongInput = Array(100 + 1)
  .fill("a")
  .join("");

//test options

const maxOptions = Array(20)
  .fill(0)
  .map((e, i) => `Option ${i}`);

const testOptions = testErrors([
  ["sends errors if option is empty", ["Option is empty", ""]],
  ["sends errors if option exceeds character limit", ["Option exceeds character limit", overlyLongInput]],
  ["sends errors if option already exists", ["Option already exists", "Option A", ["Option A"]]],
  ["sends errors if option exceeds limit", ["Option exceeds limit", "Option A", maxOptions]]
]);

//test title

const duplicate = () => pollsCol().insertOne(newPoll({ title: "Title A" }));

const testTitle = testErrors([
  ["sends errors if title is empty", ["Title is empty", ""]],
  ["sends errors if title exceeds character limit", ["Title exceeds character limit", overlyLongInput]],
  ["sends errors if title already exists", ["Title already exists", "Title A"], duplicate]
]);

//exports

module.exports = {
  initTestUnvote,
  initTestVote,
  initTestToggle,
  overlyLongInput,
  testOptions,
  testTitle
};

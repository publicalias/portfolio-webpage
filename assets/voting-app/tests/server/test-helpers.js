"use strict";

//local imports

const { newPoll } = require("../../schemas");

//global imports

const { initTestErrors, overlyLongInput, testMock } = require("redux/tests/meta-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");
const usersCol = () => db.collection("auth/users");

//init test toggle

const initTestToggle = (handler, getData, prop) => async (user) => {

  await Promise.all([
    pollsCol().insertOne(newPoll({ id: "id-a" })),
    user && usersCol().insertOne(user)
  ]);

  const toggleProp = async (bool = false) => {

    const res = await handler(user || {}, getData());

    const [update, actual] = await Promise.all([
      pollsCol().findOne(),
      user || usersCol().findOne()
    ]);

    testMock(res.json, [{}]);

    expect(update.users[prop]).toEqual(bool ? [actual.id] : []);

  };

  await toggleProp(true);
  await toggleProp();

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

  const checkVote = (val) => {
    expect(update.options[0].voted).toEqual(val);
  };

  if (user) {
    testMock(res.json, [{}]);
    checkVote([]);
  } else {
    testMock(res.sendStatus, [401]);
    checkVote(["id-b"]);
  }

};

//init test vote

const initTestVote = (handler, getData) => async (user) => {

  const options = [{ text: "Option A" }, { text: "Option B" }];

  await Promise.all([
    pollsCol().insertOne(newPoll({
      id: "id-a",
      options
    })),
    user && usersCol().insertOne(user)
  ]);

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

  await castVote(0);
  await castVote(1);

};

//test options

const maxOptions = Array(100)
  .fill(0)
  .map((e, i) => `Option ${i}`);

const testOptions = initTestErrors([
  ["sends errors if option is empty", ["Option is empty", ""]],
  ["sends errors if option exceeds character limit", ["Option exceeds character limit", overlyLongInput()]],
  ["sends errors if option already exists", ["Option already exists", "Option A", ["Option A"]]],
  ["sends errors if option exceeds limit", ["Option exceeds limit", "Option A", maxOptions]]
]);

//test title

const duplicate = () => pollsCol().insertOne(newPoll({ title: "Title A" }));

const testTitle = initTestErrors([
  ["sends errors if title is empty", ["Title is empty", ""]],
  ["sends errors if title exceeds character limit", ["Title exceeds character limit", overlyLongInput()]],
  ["sends errors if title already exists", ["Title already exists", "Title A"], duplicate]
]);

//exports

module.exports = {
  initTestUnvote,
  initTestVote,
  initTestToggle,
  testOptions,
  testTitle
};

"use strict";

//global imports

const { newPoll } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");

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

//exports

module.exports = {
  initTestVote,
  initTestToggle,
  overlyLongInput
};

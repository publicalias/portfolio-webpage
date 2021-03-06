"use strict";

//global imports

const { bindObject } = require("all/utilities");
const { newMockAPICall, newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");

//node modules

const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

//init mock api call

const initMockAPICall = (fn, method) => async (user = {}, data = null) => {

  const { req, res } = newMockAPICall(method, user, data, jest.fn);

  await fn(req, res);

  return res;

};

//mongo tests

const mongoTests = {

  client: null,
  server: null,

  //setup

  async setup() {

    this.server = new MongoMemoryServer({ binary: { version: "4.2.0" } });

    this.client = await MongoClient.connect(await this.server.getConnectionString(), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    global.db = this.client.db();

  },

  //teardown

  async teardown() {
    await this.client.close();
    await this.server.stop();
  },

  //reset

  reset(...args) {
    return async () => {

      const mapAll = (fn) => Promise.all(args.map((e) => fn(e())));

      await mapAll((e) => e.createIndex({ __qa: 1 })); //prevents errors
      await mapAll((e) => e.dropIndexes());

      await mapAll((e) => e.deleteMany());

    };
  }

};

bindObject(mongoTests);

//test auth fail

const testAuthFail = async (mockAPICall, data, other = []) => {

  const users = [{}, newUser({ data: { restricted: true } }), ...other];

  const res = await Promise.all(users.map((e) => mockAPICall(e, data)));

  res.forEach((e, i) => {
    testMock(e.sendStatus, [i === 0 ? 401 : 403]);
  });

};

//test insert

const omitKeys = (obj, keys) => Object.entries(obj)
  .map(([key, val]) => [key, keys.includes(key) ? "[CENSORED]" : val])
  .reduce((acc, [key, val]) => Object.assign(acc, {
    [key]: val
  }), {});

const testInsert = async (collection, keys = []) => {

  const insert = await collection().findOne();

  expect(omitKeys(insert, ["_id", "id", "date", ...keys])).toMatchSnapshot();

};

//exports

module.exports = {
  initMockAPICall,
  mongoTests,
  testAuthFail,
  testInsert
};

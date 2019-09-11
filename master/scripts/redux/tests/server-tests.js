"use strict";

//global imports

const { bindObject } = require("all/utilities");
const { newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");

//node modules

const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

//init mock api call

const initMockAPICall = (fn, method) => async (user, data) => {

  const isQuery = method === "GET" || method === "DELETE";

  const reqUser = user.auth ? { user } : { ip: user.ip };
  const reqData = isQuery ? { query: { data: JSON.stringify(data) } } : { body: { data } };
  const resSent = { headersSent: false };

  const resMock = () => jest.fn(() => {
    resSent.headersSent = true;
  });

  const req = Object.assign(reqUser, reqData);
  const res = Object.assign(resSent, {
    json: resMock(),
    sendStatus: resMock()
  });

  await fn(req, res);

  return res;

};

//mongo tests

const mongoTests = {

  client: null,
  server: null,

  //setup

  async setup() {

    this.server = new MongoMemoryServer();

    const uri = await this.server.getConnectionString();
    const config = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    this.client = await MongoClient.connect(uri, config);

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

      await Promise.all([
        mapAll((e) => e.deleteMany()),
        mapAll((e) => e.dropIndexes())
      ]);

    };
  }

};

bindObject(mongoTests);

//test auth fail

const testAuthFail = async (mockAPICall, data, other = []) => {

  const users = [{}, newUser({ data: { restricted: true } }), ...other];

  const res = await Promise.all(users.map((e) => mockAPICall(e, data)));

  for (const e of res) {
    testMock(e.sendStatus, [401]);
  }

};

//exports

module.exports = {
  initMockAPICall,
  mongoTests,
  testAuthFail
};

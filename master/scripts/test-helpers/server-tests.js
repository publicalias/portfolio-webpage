"use strict";

//local imports

const { testMock } = require("./meta-tests");
const { newUser } = require("../schemas/master");
const { bindObject } = require("../utilities");

//node modules

const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

//init mock api call

const initMockAPICall = (fn, method) => async (user, data) => {

  const isQuery = method === "GET" || method === "DELETE";

  const reqUser = user.auth ? { user } : { ip: user.ip };
  const reqData = isQuery ? { query: { data: JSON.stringify(data) } } : { body: { data } };

  const req = Object.assign(reqUser, reqData);
  const res = {
    json: jest.fn(),
    sendStatus: jest.fn()
  };

  await fn(req, res);

  return res;

};

//mongo tests

const mongoTests = {

  //initialization

  mongoServer: null,

  async setup() {

    this.mongoServer = new MongoMemoryServer();

    const mongoURI = await this.mongoServer.getConnectionString();
    const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true });

    global.db = client.db();

  },

  teardown() {
    this.mongoServer.stop();
  },

  //reset

  reset(...args) {
    return async () => {
      await Promise.all(args.map((e) => e().deleteMany()));
    };
  }

};

bindObject(mongoTests);

//test auth fail

const testAuthFail = async (mockAPICall, data, other = []) => {

  const users = [{}, newUser({ data: { restricted: true } })].concat(other);

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

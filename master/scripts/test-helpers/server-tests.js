"use strict";

//global imports

const { mockUser } = require("test-helpers/mocks");
const { bindObject } = require("utilities");

//node modules

const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

//mock api call

const mockAPICall = (fn, method) => async (user, data, type) => {

  const req = Object.assign(user.auth ? {
    user
  } : {
    ip: user.ip
  }, method === "GET" || method === "DELETE" ? {
    query: { data: JSON.stringify(data) }
  } : {
    body: { data }
  });

  const res = {
    json: jest.fn((obj) => JSON.stringify(obj)),
    sendStatus: jest.fn((num) => num)
  };

  const json = res.json.mock.calls;
  const sendStatus = res.sendStatus.mock.calls;

  await fn(req, res);

  switch (type) {
    case "json":

      expect(json.length).toEqual(1);
      expect(sendStatus.length).toEqual(0);

      return json[0][0];

    case "sendStatus":

      expect(json.length).toEqual(0);
      expect(sendStatus.length).toEqual(1);

      return sendStatus[0][0];

  }

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
      await Promise.all(args.map((e) => e().deleteMany({})));
    };
  }

};

bindObject(mongoTests);

//test auth fail

const testAuthFail = async (handler, data, more = []) => {

  const users = [{}, mockUser({ data: { restricted: true } })].concat(more);

  const output = await Promise.all(users.map((e) => handler(e, data, "sendStatus")));

  expect(output).toEqual(Array(users.length).fill(401));

};

//exports

module.exports = {
  mockAPICall,
  mongoTests,
  testAuthFail
};
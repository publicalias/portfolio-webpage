"use strict";

//node modules

const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

//utilities

const mongoServer = new MongoMemoryServer();

//mock api call

const mockAPICall = (fn, method) => async (data, user, type, assert) => {

  const req = Object.assign({
    user: user || undefined
  }, method === "GET" || method === "DELETE" ? {
    query: data ? JSON.stringify(data) : undefined
  } : {
    body: data || undefined
  });

  const res = {
    json: jest.fn((obj) => JSON.stringify(obj)),
    sendStatus: jest.fn((num) => num)
  };

  const jsonCalls = res.json.mock.calls;
  const sendStatusCalls = res.sendStatus.mock.calls;

  await fn(req, res);

  let output;

  switch (type) {
    case "json":
      expect(jsonCalls.length).toEqual(1);
      expect(sendStatusCalls.length).toEqual(0);
      output = jsonCalls[0][0];
      break;
    case "sendStatus":
      expect(jsonCalls.length).toEqual(0);
      expect(sendStatusCalls.length).toEqual(1);
      output = sendStatusCalls[0][0];
  }

  if (typeof assert === "function") {
    assert(output);
  } else {
    expect(output).toEqual(assert);
  }

};

//mongo setup

const mongoSetup = async () => {

  const mongoURI = await mongoServer.getConnectionString();
  const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true });

  global.db = client.db();

};

//mongo teardown

const mongoTeardown = () => {
  mongoServer.stop();
};

//exports

module.exports = {
  mockAPICall,
  mongoSetup,
  mongoTeardown
};

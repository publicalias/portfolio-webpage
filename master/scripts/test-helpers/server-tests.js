"use strict";

//node modules

const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

//utilities

const mongoServer = new MongoMemoryServer();

//mock api call

const mockAPICall = (fn, method) => async (user, data, type) => {

  const req = Object.assign({
    user
  }, method === "GET" || method === "DELETE" ? {
    query: data && JSON.stringify(data)
  } : {
    body: data
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

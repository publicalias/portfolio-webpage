"use strict";

//global imports

const { deepCopy } = require("utilities");

//mock data

const mockData = (schema, replace = []) => (data = {}) => {

  for (const { key, fn } of replace) {
    if (data[key] !== undefined) {
      data[key] = fn(data[key]);
    }
  }

  return deepCopy(schema, data);

};

//mock ip user

const mockIPUser = mockData({
  id: "",
  type: "ip",
  ip: ""
});

//mock user

const mockUser = mockData({
  name: "",
  id: "",
  type: "auth",
  auth: {
    provider: "",
    id: ""
  },
  data: { restricted: false }
});

//exports

module.exports = {
  mockData,
  mockIPUser,
  mockUser
};

"use strict";

//global imports

const { deepCopy } = require("utilities");

//mock data

const mockData = (schema, replace = {}) => (data = {}) => {

  for (const p in replace) {
    if (p in data) {
      data[p] = replace[p](data[p]);
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

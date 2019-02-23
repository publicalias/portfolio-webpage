"use strict";

//global imports

const { deepCopy } = require("utilities");

//mock data

const mockData = (schema, arrays = []) => (data = {}) => {

  for (const { key, val } of arrays) {
    if (data[key]) {
      data[key] = data[key].map((e) => deepCopy(val, e));
    }
  }

  return deepCopy(schema, data);

};

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
  mockUser
};

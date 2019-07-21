"use strict";

//local imports

const { deepCopy } = require("./utilities");

//init schema

const initSchema = (schema, replace = {}) => (data) => {

  if (data) {
    for (const p in replace) {
      if (p in data) {
        data[p] = replace[p](data[p]);
      }
    }
  }

  return deepCopy(schema, data);

};

//new error

const newError = initSchema({
  text: "",
  timer: 3000
});

//new ip user

const newIPUser = initSchema({
  id: "",
  type: "ip",
  ip: ""
});

//new user

const newUser = initSchema({
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
  initSchema,
  newError,
  newIPUser,
  newUser
};

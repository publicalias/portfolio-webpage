"use strict";

//global imports

const { deepCopy } = require("all/utilities");

//init schema / copy schema

const initSchema = (init, replacers = {}) => {

  const newSchema = (...data) => deepCopy(

    init,

    ((data) => Object.keys(data).reduce((acc, f) => {

      const [i, r, d] = [init[f], replacers[f], data[f]];

      if (i !== undefined) {
        if (typeof r === "function") {
          acc[f] = r(d);
        } else if (i && typeof i === "object" && !Array.isArray(i)) {
          acc[f] = initSchema(i, r)(d);
        } else {
          acc[f] = d;
        }
      }

      return acc;

    }, {}))(deepCopy(...data))

  );

  return Object.assign(newSchema, {
    init,
    replacers
  });

};

const copySchema = (...args) => initSchema(
  deepCopy(...args.map((e) => e.init)),
  deepCopy(...args.map((e) => e.replacers))
);

//list replacer

const listReplacer = (newSchema) => (val) => val.map((e) => newSchema(e));

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

//new mock api call

const newMockAPICall = (method, user, data, mock) => {

  const isQuery = method === "GET" || method === "DELETE";

  const reqUser = user.auth ? { user } : { ip: "ip" in user ? user.ip : "0.0.0.0" };
  const reqData = isQuery ? {
    query: { data: JSON.stringify(data) },
    body: {}
  } : {
    query: {},
    body: { data }
  };

  const resSent = { headersSent: false };
  const resMock = ((fn) => ({
    json: mock(fn),
    sendStatus: mock(fn)
  }))(() => {
    resSent.headersSent = true;
  });

  return {
    req: Object.assign(reqUser, reqData),
    res: Object.assign(resSent, resMock)
  };

};

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
  copySchema,
  initSchema,
  listReplacer,
  newError,
  newIPUser,
  newMockAPICall,
  newUser
};

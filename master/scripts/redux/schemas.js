"use strict";

//global imports

const { deepCopy } = require("all/utilities");

//init schema / copy schema

const initSchema = (init, replacers = {}) => {

  const newSchema = (...data) => deepCopy(

    init,

    ...data.map((e) => e && Object.keys(e).reduce((acc, f) => {

      const [i, r, d] = [init[f], replacers[f], e[f]];

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

    }, {}))

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
  newUser
};

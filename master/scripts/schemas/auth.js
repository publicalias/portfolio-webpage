"use strict";

//local imports

const { newSchema } = require("../utilities"); //necessary

//new ip user

const newIPUser = newSchema({
  id: "",
  type: "ip",
  ip: ""
});

//new user

const newUser = newSchema({
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
  newIPUser,
  newUser
};

"use strict";

//local imports

const formHandlers = require("./handlers/form-handlers");
const listHandlers = require("./handlers/list-handlers");
const metaHandlers = require("./handlers/meta-handlers");
const viewHandlers = require("./handlers/view-handlers");

//global imports

const { apiHandler } = require(`${__rootdir}/master/scripts/server-utils`);

//handle actions

const router = apiHandler(Object.assign(
  formHandlers,
  listHandlers,
  metaHandlers,
  viewHandlers
));

//exports

module.exports = router;

"use strict";

const { select } = require("dom-api");

//initialize app

select(".js-edit-unix").href = `/timestamp-api/${Date.now()}`;

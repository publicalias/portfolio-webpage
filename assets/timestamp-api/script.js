"use strict";

//global imports

const { select } = require("dom-api");

//initialize app

select(document).on("DOMContentLoaded", () => {
  select(".js-edit-unix").href = `/timestamp-api/${Date.now()}`;
});

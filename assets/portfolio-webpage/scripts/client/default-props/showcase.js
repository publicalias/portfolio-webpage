"use strict";

//local imports

const { groups } = require("./groups/groups");

//showcase

const showcase = {
  projects: [
    groups[1].subgroups[0].projects[3],
    groups[1].subgroups[0].projects[4],
    groups[1].subgroups[1].projects[4],
    groups[2].subgroups[1].projects[0]
  ]
};

//exports

module.exports = { showcase };

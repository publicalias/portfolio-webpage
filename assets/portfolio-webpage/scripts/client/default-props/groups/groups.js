"use strict";

//local imports

const { backEnd } = require("./back-end");
const { dataVis } = require("./data-vis");
const { frontEnd } = require("./front-end");

//groups

const groups = [frontEnd, dataVis, backEnd];

//exports

module.exports = { groups };

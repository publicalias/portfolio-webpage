"use strict";

//local imports

const globals = require("./globals");

//exports

module.exports = {
  globals,
  moduleDirectories: ["master/scripts", "node_modules"],
  moduleFileExtensions: ["js", "jsx"],
  snapshotSerializers: ["enzyme-to-json/serializer"]
};

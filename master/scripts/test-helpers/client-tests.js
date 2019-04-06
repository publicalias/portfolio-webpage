"use strict";

//node modules

const { configure } = require("enzyme");

const Adapter = require("enzyme-adapter-react-16");

//react tests

const reactTests = {
  setup() {
    configure({ adapter: new Adapter() });
  }
};

//exports

module.exports = { reactTests };

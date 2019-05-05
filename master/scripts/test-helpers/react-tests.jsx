"use strict";

//node modules

const Adapter = require("enzyme-adapter-react-16");

const { configure } = require("enzyme");

//react tests

const reactTests = {
  setup() {
    configure({ adapter: new Adapter() });
  }
};

//exports

module.exports = { reactTests };

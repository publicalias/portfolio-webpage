"use strict";

//node modules

const Adapter = require("enzyme-adapter-react-16");

const { configure } = require("enzyme");

//init mock props

const initMockProps = (newState, actions) => (data) => ({

  data: newState(data),

  actions: Object.keys(actions).reduce((acc, e) => {

    acc[e] = jest.fn();

    return acc;

  }, {})

});

//react tests

const reactTests = {
  setup() {
    configure({ adapter: new Adapter() });
  }
};

//exports

module.exports = {
  initMockProps,
  reactTests
};

"use strict";

//local imports

const App = require("../../scripts/components/app");

//global imports

const { reactTests } = require("client-tests");

//node modules

const React = require("react");

const { shallow } = require("enzyme");

//setup

beforeAll(reactTests.setup);

//app

test("app renders a div", () => {

  const wrapper = shallow(<App />);

  expect(wrapper.find("div").length).toEqual(1);

});

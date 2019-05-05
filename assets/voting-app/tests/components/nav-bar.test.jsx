"use strict";

//local imports

const NavBar = require("../../scripts/components/nav-bar");

//global imports

const { reactTests } = require("test-helpers/react-tests");

//node modules

const React = require("react");

const { shallow } = require("enzyme");

//setup

beforeAll(reactTests.setup);

//nav bar

test("nav bar should match snapshot", () => {

  const wrapper = shallow(<NavBar />);

  expect(wrapper).toMatchSnapshot();

});

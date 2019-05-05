"use strict";

//local imports

const Sidebar = require("../../scripts/components/sidebar");

//global imports

const { reactTests } = require("test-helpers/react-tests");

//node modules

const React = require("react");

const { shallow } = require("enzyme");

//setup

beforeAll(reactTests.setup);

//sidebar

test("sidebar should match snapshot", () => {

  const wrapper = shallow(<Sidebar />);

  expect(wrapper).toMatchSnapshot();

});

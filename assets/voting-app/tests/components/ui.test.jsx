"use strict";

//local imports

const UI = require("../../scripts/components/ui");

//global imports

const { reactTests } = require("test-helpers/react-tests");

//node modules

const React = require("react");

const { shallow } = require("enzyme");

//setup

beforeAll(reactTests.setup);

//ui

test("ui should match snapshot", () => {

  const wrapper = shallow(<UI />);

  expect(wrapper).toMatchSnapshot();

});

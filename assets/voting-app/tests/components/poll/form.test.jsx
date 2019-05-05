"use strict";

//local imports

const Form = require("../../../scripts/components/poll/form");

//global imports

const { reactTests } = require("test-helpers/react-tests");

//node modules

const React = require("react");

const { shallow } = require("enzyme");

//setup

beforeAll(reactTests.setup);

//form

test("form should match snapshot", () => {

  const wrapper = shallow(<Form />);

  expect(wrapper).toMatchSnapshot();

});

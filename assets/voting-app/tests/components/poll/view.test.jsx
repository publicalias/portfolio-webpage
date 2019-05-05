"use strict";

//local imports

const View = require("../../../scripts/components/poll/view");

//global imports

const { reactTests } = require("test-helpers/react-tests");

//node modules

const React = require("react");

const { shallow } = require("enzyme");

//setup

beforeAll(reactTests.setup);

//view

test("view should match snapshot", () => {

  const wrapper = shallow(<View />);

  expect(wrapper).toMatchSnapshot();

});

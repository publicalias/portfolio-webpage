"use strict";

//local imports

const List = require("../../../scripts/components/poll/list");

//global imports

const { reactTests } = require("test-helpers/react-tests");

//node modules

const React = require("react");

const { shallow } = require("enzyme");

//setup

beforeAll(reactTests.setup);

//list

test("list should match snapshot", () => {

  const wrapper = shallow(<List />);

  expect(wrapper).toMatchSnapshot();

});

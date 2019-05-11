"use strict";

//local imports

const Sidebar = require("../../scripts/components/sidebar");

const { testWrapper } = require("../test-helpers");

//global imports

const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//utilities

const { testShallow } = testWrapper(Sidebar);

//sidebar

test("sidebar should match snapshot", () => {

  const { wrapper } = testShallow();

  expect(wrapper).toMatchSnapshot();

});

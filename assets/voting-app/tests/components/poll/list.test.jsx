"use strict";

//local imports

const List = require("../../../scripts/components/poll/list");

const { testWrapper } = require("../../test-helpers");

//global imports

const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//utilities

const { testShallow } = testWrapper(List);

//list

test("list should match snapshot", () => {

  const { wrapper } = testShallow();

  expect(wrapper).toMatchSnapshot();

});

"use strict";

//local imports

const Form = require("../../../scripts/components/poll/form");

const { testWrapper } = require("../../test-helpers");

//global imports

const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//utilities

const { testShallow } = testWrapper(Form);

//form

test("form should match snapshot", () => {

  const { wrapper } = testShallow();

  expect(wrapper).toMatchSnapshot();

});

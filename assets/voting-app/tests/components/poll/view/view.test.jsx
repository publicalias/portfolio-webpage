"use strict";

//local imports

const View = require("../../../../scripts/components/poll/view/view");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//utilities

const { testShallow } = testWrapper(View);

//view

test("view should match snapshot", () => {

  const { wrapper } = testShallow();

  expect(wrapper).toMatchSnapshot();

});

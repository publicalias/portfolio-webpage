"use strict";

//local imports

const Sidebar = require("../../scripts/components/sidebar");

const { testWrapper } = require("../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//sidebar

describe("sidebar", () => {

  const { testShallow } = testWrapper(Sidebar);

  it("should match snapshot (default)", () => {

    const { wrapper } = testShallow();

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (authenticated)", () => {

    const { wrapper } = testShallow({ user: newUser({ name: "Ethan Frost" }) });

    expect(wrapper).toMatchSnapshot();

  });

});

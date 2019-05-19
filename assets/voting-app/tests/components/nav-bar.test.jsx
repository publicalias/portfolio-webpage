"use strict";

//local imports

const NavBar = require("../../scripts/components/nav-bar");

const { testWrapper } = require("../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//nav bar

describe("nav bar", () => {

  const { testShallow } = testWrapper(NavBar);

  it("should match snapshot (default)", () => {

    const { wrapper } = testShallow();

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (authenticated)", () => {

    const { wrapper } = testShallow({ user: newUser() });

    expect(wrapper).toMatchSnapshot();

  });

});

"use strict";

//local imports

const ListBody = require("../../../../scripts/components/main/list/list-body");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//list body

describe("list body", () => {

  const { testShallow } = testWrapper(ListBody);

  it("should match snapshot (default)", () => {

    const { wrapper } = testShallow();

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (authenticated)", () => {

    const { wrapper } = testShallow({ user: newUser() });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (polls)", () => {

    const { wrapper } = testShallow({ polls: [newPoll()] });

    expect(wrapper).toMatchSnapshot();

  });

});

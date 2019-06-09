"use strict";

//local imports

const ListItem = require("../../../../scripts/components/main/list/list-item");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { reactTests } = require("test-helpers/react-tests");

//node modules

const { MemoryRouter } = require("react-router-dom");

//setup

beforeAll(reactTests.setup);

//list item

describe("list item", () => {

  const { testShallow } = testWrapper(ListItem, MemoryRouter);

  it("should match snapshot (default)", () => {

    const { wrapper } = testShallow({}, { poll: newPoll() });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (authenticated)", () => {

    const { wrapper } = testShallow({ user: newUser() }, { poll: newPoll() });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (10^3 votes)", () => {

    const { wrapper } = testShallow({}, { poll: newPoll({ users: { voted: Math.pow(10, 3) } }) });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (10^6 votes)", () => {

    const { wrapper } = testShallow({}, { poll: newPoll({ users: { voted: Math.pow(10, 6) } }) });

    expect(wrapper).toMatchSnapshot();

  });

  it("should match snapshot (10^9 votes)", () => {

    const { wrapper } = testShallow({}, { poll: newPoll({ users: { voted: Math.pow(10, 9) } }) });

    expect(wrapper).toMatchSnapshot();

  });

});

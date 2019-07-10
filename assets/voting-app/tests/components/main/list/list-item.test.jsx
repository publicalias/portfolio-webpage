"use strict";

//local imports

const ListItem = require("../../../../scripts/components/main/list/list-item");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//node modules

const { MemoryRouter } = require("react-router-dom");

//setup

beforeAll(reactTests.setup);

//list item

describe("list item", () => {

  const { testShallow } = testWrapper(ListItem, MemoryRouter);

  const testSnapshot = initTestSnapshot(testShallow);

  const testProps = (data, pollData = {}) => testSnapshot(data, {
    poll: newPoll({
      title: "Title A",
      id: "id-a",
      ...pollData
    })
  });

  const testVotes = (mag) => testProps(null, { users: { voted: 10 ** mag } });

  it("should match snapshot (default)", () => testProps());

  it("should match snapshot (authenticated)", () => testProps({ user: newUser() }));

  it("should match snapshot (10^3 votes)", () => testVotes(3));

  it("should match snapshot (10^6 votes)", () => testVotes(6));

  it("should match snapshot (10^9 votes)", () => testVotes(9));

});

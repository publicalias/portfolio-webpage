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
beforeEach(reactTests.inject(ListItem, { lib: { getVotes: jest.fn(() => "0 Votes") } }));

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

  it("should match snapshot (default)", () => testProps());

  it("should match snapshot (authenticated)", () => testProps({ user: newUser() }));

});

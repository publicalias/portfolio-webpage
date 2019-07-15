"use strict";

//local imports

const ListItem = require("../../../../scripts/components/main/list/list-item");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { initTestSnapshot, reactTests, withDataList } = require("test-helpers/react-tests");

//node modules

const { MemoryRouter } = require("react-router-dom");

//utilities

const { testShallow } = testWrapper(ListItem, MemoryRouter);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ListItem, { lib: { getVotes: jest.fn(() => "0 Votes") } }));

//list item

describe("list item", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, {
    poll: newPoll({
      title: "Title A",
      id: "id-a"
    })
  }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

});

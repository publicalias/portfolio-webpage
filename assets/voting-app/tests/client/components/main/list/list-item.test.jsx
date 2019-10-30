"use strict";

//local imports

const ListItem = require("../../../../../scripts/client/components/main/list/list-item");

const { newPoll } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(ListItem);

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

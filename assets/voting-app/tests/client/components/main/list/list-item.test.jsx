"use strict";

//local imports

const ListItem = require("../../../../../scripts/client/components/main/list/list-item");

const { newPoll } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(ListItem);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ListItem, {
  lib: {
    getVotes: jest.fn(() => "0 Votes"),
    readDate: jest.fn(() => "31 December 1969")
  }
}));

//list item

describe("ListItem", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, {
    poll: newPoll({
      title: "Title A",
      id: "id-a"
    })
  }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

});

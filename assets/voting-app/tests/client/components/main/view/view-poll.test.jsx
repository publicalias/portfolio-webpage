"use strict";

//local imports

const ViewPoll = require("../../../../../scripts/client/components/main/view/view-poll");

const { newOption, newPoll } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(ViewPoll);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ViewPoll));

//view poll

describe("ViewPoll", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, {
    bool: {
      canAdd: false,
      hasOptions: false
    },
    poll: newPoll()
  }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (can add)", () => testSnapshot(null, { bool: { canAdd: true } }));

  it("should match snapshot (has options)", () => testSnapshot(null, { bool: { hasOptions: true } }));

  it("should match snapshot (title)", () => testSnapshot(null, { poll: { title: "Title A" } }));

  it("should match snapshot (author)", () => testSnapshot(null, { poll: { author: "User A" } }));

  it("should match snapshot (options)", () => {

    const dataList = [null, { poll: { options: [newOption({ text: "Option A" })] } }];

    testSnapshot(...dataList);

  });

});

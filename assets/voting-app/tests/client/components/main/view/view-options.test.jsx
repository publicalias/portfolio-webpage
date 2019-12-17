"use strict";

//local imports

const ViewOptions = require("../../../../../scripts/client/components/main/view/view-options");

const { newPoll } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(ViewOptions);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ViewOptions, { lib: { chartColor: jest.fn(() => "black") } }));

//view options

describe("ViewOptions (general)", () => {

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

});

describe("ViewOptions (options)", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, {
    bool: {
      canAdd: false,
      hasOptions: true
    },
    poll: newPoll({ options: [{ text: "Option A" }] })
  }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (created, poll)", () => {

    const dataList = [{ user: newUser({ id: "id-a" }) }, { poll: { users: { created: "id-a" } } }];

    testSnapshot(...dataList);

  });

  it("should match snapshot (created, option)", () => {

    const dataList = [{ user: newUser({ id: "id-a" }) }, { poll: { options: [{ created: "id-a" }] } }];

    testSnapshot(...dataList);

  });

  it("should match snapshot (voted)", () => {

    const dataList = [{ user: newUser({ id: "id-a" }) }, { poll: { options: [{ voted: ["id-a"] }] } }];

    testSnapshot(...dataList);

  });

});

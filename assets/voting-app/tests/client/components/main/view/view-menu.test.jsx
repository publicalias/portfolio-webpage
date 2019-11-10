"use strict";

//local imports

const ViewMenu = require("../../../../../scripts/client/components/main/view/view-menu");

const { newPoll } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { deepCopy } = require("all/utilities");
const { newUser } = require("redux/schemas");
const { initTestEvent, initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(ViewMenu);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ViewMenu));

//view menu

describe("ViewMenu", () => {

  const dataList = [{ user: newUser({ id: "id-a" }) }, { poll: newPoll({ users: { created: "id-a" } }) }];

  const testSnapshot = initTestSnapshot(testShallow);

  const testClick = initTestEvent(testShallow, "click");

  it("should match snapshot (default)", () => testSnapshot(null, { poll: newPoll() }));

  it("should match snapshot (created)", () => testSnapshot(...dataList));

  it("should match snapshot (created, settings)", () => {

    const fullDataList = deepCopy(dataList, [{ view: { settings: true } }]);

    testSnapshot(...fullDataList);

  });

  it("should call handleClick on click", () => {

    const fn = ["viewToggleSettings", []];

    return testClick(".qa-toggle-settings", dataList, fn);

  });

});

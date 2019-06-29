"use strict";

//local imports

const ViewMenu = require("../../../../scripts/components/main/view/view-menu");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { initTestClick, initTestSnapshot, reactTests } = require("test-helpers/react-tests");
const { deepCopy } = require("utilities");

//setup

beforeAll(reactTests.setup);

//view menu

describe("view menu", () => {

  const { testMount, testShallow } = testWrapper(ViewMenu);

  const testClick = initTestClick(testMount);
  const testSnapshot = initTestSnapshot(testShallow);

  const data = { user: newUser({ id: "id-a" }) };
  const local = { poll: newPoll({ users: { created: "id-a" } }) };

  it("should match snapshot (default)", () => testSnapshot(null, { poll: newPoll() }));

  it("should match snapshot (created)", () => testSnapshot(data, local));

  it("should match snapshot (created, settings)", () => {

    const thisData = deepCopy(data, { view: { settings: true } });

    testSnapshot(thisData, local);

  });

  it("should call viewToggleSettings on click", () => testClick(".qa-toggle-settings", "viewToggleSettings", [], data, local));

});

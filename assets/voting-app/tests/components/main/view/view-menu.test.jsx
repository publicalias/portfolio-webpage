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

  const props = [{ user: newUser({ id: "id-a" }) }, { poll: newPoll({ users: { created: "id-a" } }) }];

  it("should match snapshot (default)", () => testSnapshot({}, { poll: newPoll() }));

  it("should match snapshot (created)", () => testSnapshot(...props));

  it("should match snapshot (created, settings)", () => {

    const innerProps = deepCopy(props, [{ view: { settings: true } }]);

    testSnapshot(...innerProps);

  });

  it("should call viewToggleSettings on click", () => testClick(".qa-toggle-settings", "viewToggleSettings", [], ...props));

});

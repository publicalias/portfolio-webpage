"use strict";

//local imports

const ViewMenu = require("../../../../scripts/components/main/view/view-menu");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { initTestEvent, initTestSnapshot, reactTests } = require("test-helpers/react-tests");
const { deepCopy } = require("utilities");

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ViewMenu));

//view menu

describe("view menu", () => {

  const { testMount, testShallow } = testWrapper(ViewMenu);

  const testClick = initTestEvent(testMount, "click");
  const testSnapshot = initTestSnapshot(testShallow);

  const dataList = [{ user: newUser({ id: "id-a" }) }, { poll: newPoll({ users: { created: "id-a" } }) }];

  it("should match snapshot (default)", () => testSnapshot(null, { poll: newPoll() }));

  it("should match snapshot (created)", () => testSnapshot(...dataList));

  it("should match snapshot (created, settings)", () => {

    const thisDataList = deepCopy(dataList, [{ view: { settings: true } }]);

    testSnapshot(...thisDataList);

  });

  it("should call viewToggleSettings on click", () => {

    const fn = ["viewToggleSettings", []];

    return testClick(".qa-toggle-settings", dataList, fn);

  });

});

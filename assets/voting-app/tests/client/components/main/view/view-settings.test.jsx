"use strict";

//local imports

const ViewSettings = require("../../../../../scripts/client/components/main/view/view-settings");

const { newPoll } = require("../../../../../schemas");
const { testCreateDelete, testWrapper } = require("../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, testSubmit, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(ViewSettings);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ViewSettings));

//view settings

describe("ViewSettings (snapshots)", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, { poll: newPoll() }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (confirm)", () => testSnapshot({ view: { delete: true } }));

  it("should match snapshot (secret)", () => testSnapshot(null, { poll: { secret: true } }));

  it("should match snapshot (flagged)", () => testSnapshot(null, { poll: { users: { flagged: Array(5).fill("") } } }));

});

describe("ViewSettings (events)", () => {

  const testClick = initTestEvent(withDataList(testShallow, [null, { poll: newPoll() }]), "click");

  it("should call handleConfirm on click (delete)", () => testClick(
    ".qa-click-delete",
    [],
    ["viewToggleDelete", []]
  ));

  it("should call handleConfirm on click (no)", () => testClick(
    ".qa-click-no",
    [{ view: { delete: true } }],
    ["viewToggleDelete", []]
  ));

  it("should call handleSecret on click (secret)", () => testClick(
    ".qa-toggle-secret",
    [null, { poll: newPoll({ id: "id-a" }) }],
    ["pollToggleSecret", ["id-a"]]
  ));

  testSubmit("click", "handleDelete", (res) => {

    const dataList = [{ view: { delete: true } }, { poll: newPoll({ id: "id-a" }) }];

    return testCreateDelete(testShallow, dataList, ".qa-click-yes", res, ["metaDeletePoll", ["id-a"]]);

  });

});

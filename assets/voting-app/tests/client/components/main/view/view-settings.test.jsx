"use strict";

//local imports

const ViewSettings = require("../../../../../scripts/client/components/main/view/view-settings");

const { newPoll } = require("../../../../../schemas");
const { testCreateDelete, testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, reactTests, withDataList } = require("test-helpers/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(ViewSettings);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(ViewSettings));

//view settings

describe("view settings", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, { poll: newPoll() }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (confirm)", () => testSnapshot({ view: { delete: true } }));

  it("should match snapshot (secret)", () => testSnapshot(null, { poll: { secret: true } }));

  it("should match snapshot (flagged)", () => testSnapshot(null, { poll: { users: { flagged: Array(5).fill("") } } }));

});

describe("view settings (delete)", () => {

  const testDelete = (res) => {

    const dataList = [{ view: { delete: true } }, { poll: newPoll({ id: "id-a" }) }];

    return testCreateDelete(testMount, dataList, ".qa-delete-poll", res, ["metaDeletePoll", ["id-a"]]);

  };

  it("should call metaDeletePoll on click (success)", () => testDelete({}));

  it("should call metaDeletePoll on click (errors)", () => testDelete({ errors: [] }));

  it("should call metaDeletePoll on click (failure)", () => testDelete());

});

describe("view settings (click)", () => {

  const testClick = initTestEvent(withDataList(testMount, [null, { poll: newPoll() }]), "click");

  it("should call viewToggleDelete on click (delete)", () => testClick(".qa-confirm-true", [], ["viewToggleDelete", []]));

  it("should call viewToggleDelete on click (no)", () => {

    const dataList = [{ view: { delete: true } }];

    return testClick(".qa-confirm-false", dataList, ["viewToggleDelete", []]);

  });

  it("should call pollToggleSecret on click (secret)", () => {

    const dataList = [null, { poll: newPoll({ id: "id-a" }) }];

    return testReload(testMount, dataList, ".qa-toggle-secret", "id-a", ["pollToggleSecret", ["id-a"]]);

  });

  it("should call metaAddErrors on click (secret, flagged)", () => {

    const dataList = [null, {
      poll: newPoll({
        id: "id-a",
        users: { flagged: Array(5).fill("") }
      })
    }];

    return testClick(".qa-toggle-secret", dataList, ["metaAddErrors", [
      ["Poll has been flagged too many times"]
    ]]);

  });

});

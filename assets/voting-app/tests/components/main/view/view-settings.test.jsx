"use strict";

//local imports

const ViewSettings = require("../../../../scripts/components/main/view/view-settings");

const { testCreateDelete, testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { newPoll } = require("schemas/voting-app");
const { initTestEvent, initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//view settings

describe("view settings", () => {

  const { testShallow } = testWrapper(ViewSettings);

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot(null, { poll: newPoll() }));

  it("should match snapshot (confirm)", () => testSnapshot({ view: { confirm: true } }, { poll: newPoll() }));

  it("should match snapshot (secret)", () => testSnapshot(null, { poll: newPoll({ secret: true }) }));

});

describe("view settings (delete)", () => {

  const { testMount } = testWrapper(ViewSettings);

  const testDelete = (res) => {

    const dataList = [{ view: { confirm: true } }, { poll: newPoll({ id: "id-a" }) }];

    return testCreateDelete(testMount, dataList, ".qa-delete-poll", res, ["metaDeletePoll", ["id-a"]]);

  };

  it("should call metaDeletePoll on click (success)", () => testDelete({}));

  it("should call metaDeletePoll on click (errors)", () => testDelete({ errors: [] }));

  it("should call metaDeletePoll on click (failure)", () => testDelete());

});

describe("view settings (click)", () => {

  const { testMount } = testWrapper(ViewSettings);

  const testClick = initTestEvent(testMount, "click");

  it("should call viewToggleConfirm on click (delete)", () => {

    const dataList = [null, { poll: newPoll() }];

    return testClick(".qa-confirm-true", dataList, ["viewToggleConfirm", []]);

  });

  it("should call viewToggleConfirm on click (no)", () => {

    const dataList = [{ view: { confirm: true } }, { poll: newPoll() }];

    return testClick(".qa-confirm-false", dataList, ["viewToggleConfirm", []]);

  });

  it("should call pollToggleSecret on click (secret)", () => {

    const dataList = [null, { poll: newPoll({ id: "id-a" }) }];

    return testReload(testMount, dataList, ".qa-toggle-secret", "id-a", ["pollToggleSecret", ["id-a"]]);

  });

});

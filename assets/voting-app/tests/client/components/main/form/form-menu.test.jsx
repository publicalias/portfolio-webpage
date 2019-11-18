"use strict";

//local imports

const FormMenu = require("../../../../../scripts/client/components/main/form/form-menu");

const { newForm } = require("../../../../../schemas");
const { testCreateDelete, testWrapper } = require("../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, testSubmit } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(FormMenu);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(FormMenu, { lib: { select: jest.fn(() => ({})) } }));

//form menu

describe("FormMenu (snapshots)", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (confirm)", () => testSnapshot({ form: { delete: true } }));

  it("should match snapshot (secret)", () => testSnapshot({ form: { secret: true } }));

});

describe("FormMenu (events)", () => {

  const dataList = [{ form: { delete: true } }];

  const testClick = initTestEvent(testShallow, "click");

  it("should call handleConfirm on click (discard)", () => testClick(
    ".qa-click-discard",
    [],
    ["formToggleDelete", []]
  ));

  it("should call handleDiscard on click (yes)", () => testClick(
    ".qa-click-yes",
    dataList,
    ["formClearState", []]
  ));

  it("should call handleConfirm on click (no)", () => testClick(
    ".qa-click-no",
    dataList,
    ["formToggleDelete", []]
  ));

  it("should call handleSecret on click (secret)", () => testClick(
    ".qa-toggle-secret",
    [],
    ["formToggleSecret", []]
  ));

  testSubmit("click", "handleCreate", (res) => {

    const args = [testShallow, [], ".qa-click-create", res, ["metaCreatePoll", [newForm()]]];

    return testCreateDelete(...args);

  });

});

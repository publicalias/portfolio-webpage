"use strict";

//local imports

const FormMenu = require("../../../../scripts/components/main/form/form-menu");

const { testCreateDelete, testWrapper } = require("../../../test-helpers");

//global imports

const { newForm } = require("schemas/voting-app");
const { initTestEvent, initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(FormMenu));

//form menu

describe("form menu", () => {

  const { testShallow } = testWrapper(FormMenu);

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (confirm)", () => testSnapshot({ form: { confirm: true } }));

  it("should match snapshot (secret)", () => testSnapshot({ form: { secret: true } }));

});

describe("form menu (create)", () => {

  const { testMount } = testWrapper(FormMenu);

  const testCreate = (res) => testCreateDelete(testMount, [], ".qa-create-poll", res, ["metaCreatePoll", [newForm()]]);

  it("should call metaCreatePoll and history.push on click (success)", () => testCreate({}));

  it("should call metaCreatePoll and history.push on click (errors)", () => testCreate({ errors: [] }));

  it("should call metaCreatePoll and history.push on click (failure)", () => testCreate());

});

describe("form menu (click)", () => {

  const { testMount } = testWrapper(FormMenu);

  const testClick = initTestEvent(testMount, "click");

  const dataList = [{ form: { confirm: true } }];

  it("should call formToggleConfirm on click (discard)", () => testClick(".qa-confirm-true", [], ["formToggleConfirm", []]));

  it("should call formClearState on click (yes)", () => testClick(".qa-discard-poll", dataList, ["formClearState", []]));

  it("should call formToggleConfirm on click (no)", () => testClick(".qa-confirm-false", dataList, ["formToggleConfirm", []]));

  it("should call formToggleSecret on click (secret)", () => testClick(".qa-toggle-secret", [], ["formToggleSecret", []]));

});
